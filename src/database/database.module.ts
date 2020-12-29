import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseService } from './database.service';
import { departmentSchema, employeeSchema } from './schema';
const URI = 'mongodb://localhost/emp-mgmt-portal-api';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
    MongooseModule.forFeature([{ name: 'Department', schema: departmentSchema }]),
    MongooseModule.forFeature([{ name: 'Employee', schema: employeeSchema }]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }