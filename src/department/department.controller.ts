import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department.dto';

@Controller('department')
export class DepartmentController {

  constructor(private deptService: DepartmentService) { }

  @Post('create')
  async create(@Body() data: DepartmentDto) {
    return await this.deptService.create(classToPlain(data));
  }

  @Get('list')
  async list() {
    return await this.deptService.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.deptService.get(id);
  }

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() data: DepartmentDto) {
    return await this.deptService.update(id, classToPlain(data));
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return await this.deptService.delete(id);
  }

}
