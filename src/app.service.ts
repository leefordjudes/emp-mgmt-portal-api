import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private db: DatabaseService) { }

  async createDept() {
    // await this.departmentModel.create({ name: 'dept' });
    await this.db.departmentModel.create({ name: 'dept' });
    return { message: 'create' };
  }

}
