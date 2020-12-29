import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import * as moment from 'moment';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private db: DatabaseService) { }

  async create(data: any) {
    const dept = await this.db.departmentModel.findOne({ _id: data.department }, { _id: 1 });
    if (!dept) {
      throw new BadRequestException('Invalid department found');
    }
    try {
      const emp = await this.db.employeeModel.create(data);
      return await this.get(emp.id);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Name already exists.');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async update(id: string, data: any) {
    const dept = await this.db.departmentModel.findOne({ _id: data.department }, { _id: 1 });
    if (!dept) {
      throw new BadRequestException('Invalid department found');
    }
    try {
      const emp = await this.db.employeeModel.findByIdAndUpdate(id, data, { new: true });
      return _.pick(emp, ['id', 'name']);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Name already exists.');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async get(id: string) {
    const result = await this.db.employeeModel.findById(id).populate('department');
    if (!result) {
      throw new NotFoundException('Record not found');
    }
    const obj = _.pick(result, ['id', 'name']);
    _.assign(obj, {
      department: _.pick(result.department, ['id', 'name']),
      doj: moment(result.doj).format('YYYY-MM-DD'),
    });
    return obj;
  }

  async list() {
    const results = await this.db.employeeModel.find({}).populate('department');
    return _.map(results, x => {
      const obj = _.pick(x, ['id', 'name']);
      _.assign(obj, {
        department: _.pick(x.department, ['id', 'name']),
        doj: moment(x.doj).format('YYYY-MM-DD'),
      });
      return obj;
    });
  }

  async delete(id: string) {
    const result = await this.db.employeeModel.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
      throw new NotFoundException('Record not found');
    }
    return { message: 'Record deleted.' };
  }
}
