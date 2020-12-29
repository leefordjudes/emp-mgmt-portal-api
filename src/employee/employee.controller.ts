import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private empService: EmployeeService) { }

  @Post('create')
  async create(@Body() data: EmployeeDto) {
    return await this.empService.create(classToPlain(data));
  }

  @Get('list')
  async list() {
    return await this.empService.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.empService.get(id);
  }

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() data: EmployeeDto) {
    return await this.empService.update(id, classToPlain(data));
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return await this.empService.delete(id);
  }
}
