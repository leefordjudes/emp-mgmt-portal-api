import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Department, Employee } from './interface';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('Department') public readonly departmentModel: Model<Department>,
    @InjectModel('Employee') public readonly employeeModel: Model<Employee>
  ) { }
}
