import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import * as moment from 'moment';
import { writeFile, readFile, removeFile } from '../shared/utils';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private db: DatabaseService) { }

  async create(data: any, file: any) {
    try {
      const dept = await this.db.departmentModel.findOne({ _id: data.department }, { _id: 1 });
      if (!dept) {
        throw new BadRequestException('Invalid department found');
      }
      const emp = await this.db.employeeModel.create(data);
      let isSaved = false;
      if ((!file?.buffer?.length && data.photoFileName) || (file?.buffer?.length && !data?.photoFileName)) {
        throw new BadRequestException('You can not modify photo without filename or filedata');
      }
      if (file) {
        (file.buffer).length ? await writeFile(`${emp.id}-${data.photoFileName}`, file.buffer) : false;
      }
      const employee = await this.get(emp.id);
      return {
        employee,
        message: isSaved ? 'Employee saved with photo file' : 'Employee saved',
      };

    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Name already exists.');
      }
      console.log(JSON.stringify(err));
      if (err?.message) {
        throw new HttpException(err.message, 400);
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async update(id: string, data: any, file: any) {
    if (data.department) {
      const dept = await this.db.departmentModel.findOne({ _id: data.department }, { _id: 1 });
      if (!dept) {
        throw new BadRequestException('Invalid department found');
      }
    }
    if (data.name) {
      const dup = await this.db.employeeModel.findOne({ _id: { $ne: id }, name: data.name }, { name: 1 });
      if (dup) {
        throw new BadRequestException('Name already exists.');
      }
    }
    const exEmp = await this.db.employeeModel.findById(id);
    if (!exEmp) {
      throw new BadRequestException('Invalid employee found');
    }
    try {
      const exPhotoFile = `${id}-${exEmp.photoFileName}`;
      if ((!file?.buffer?.length && data.photoFileName) || (file?.buffer?.length && !data?.photoFileName)) {
        throw new BadRequestException('You can not modify photo without filename or filedata');
      }
      for (const val in data) {
        exEmp[val] = data[val];
      }
      // console.log('exEmp', exEmp);
      if (data.photoFileName && file.buffer.length) {
        await removeFile(exPhotoFile);
        await writeFile(`${id}-${data.photoFileName}`, file.buffer);
      }
      if (Object.keys(data).length) {
        await exEmp.save();
      }
      return _.pick(exEmp, ['id', 'name']);
    } catch (err) {
      console.log(JSON.stringify(err));
      if (err.code === 11000) {
        throw new BadRequestException('Name already exists.');
      }
      throw new HttpException(err.response.message, err.response.statusCode);
    }
  }

  async get(id: string) {
    const result = await this.db.employeeModel.findById(id).populate('department');
    if (!result) {
      throw new NotFoundException('Record not found');
    }
    const obj = _.pick(result, ['id', 'name', 'photoFileName']);
    _.assign(obj, {
      department: _.pick(result.department, ['id', 'name']),
      doj: moment(result.doj).format('YYYY-MM-DD'),
    });
    if (obj.photoFileName) {
      const fileName = `${obj.id}-${obj.photoFileName}`;
      const filedata = await readFile(fileName);
      _.assign(obj, { filedata });
      return { emp: obj, filedata };
    }
    return { emp: obj };
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
    const emp = await this.db.employeeModel.findById(id, { photoFileName: 1 });
    if (emp.photoFileName) {
      await removeFile(`${id}-${emp.photoFileName}`);
    }
    const result = await this.db.employeeModel.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
      throw new NotFoundException('Record not found');
    }
    return { message: 'Record deleted.' };
  }
}
