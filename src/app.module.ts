import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { PaymentDetailModule } from './payment-detail/payment-detail.module';

@Module({
  imports: [
    DatabaseModule,
    DepartmentModule,
    EmployeeModule,
    PaymentDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
