import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class DepartmentService {
  constructor(private db: DatabaseService) { }

  async create(data: any) {
    try {
      const dept = await this.db.departmentModel.create(data);
      return _.pick(dept, ['id', 'name']);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Name already exists.');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async update(id: string, data: any) {
    try {
      const { name } = data;
      const dept = await this.db.departmentModel.findByIdAndUpdate(id, { name }, { new: true });
      return _.pick(dept, ['id', 'name']);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Name already exists.');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async get(id: string) {
    const dept = await this.db.departmentModel.findById(id);
    if (!dept) {
      throw new NotFoundException('Record not found');
    }
    return _.pick(dept, ['id', 'name']);
  }

  async list() {
    const results = await this.db.departmentModel.find({});
    return _.map(results, x => _.pick(x, ['id', 'name']));
  }

  async delete(id: string) {
    const result = await this.db.departmentModel.deleteOne({ _id: id });
    if (result.deletedCount !== 1) {
      throw new NotFoundException('Record not found');
    }
    return { message: 'Record deleted.' };
  }
}
