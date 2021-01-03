import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { Readable } from 'stream';
import { Response } from 'express';
import { Express } from 'express';
import { classToPlain } from 'class-transformer';
import { EmployeeService } from './employee.service';
import * as dto from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile, readFile } from '../shared/utils';
@Controller('employee')
export class EmployeeController {
  constructor(private empService: EmployeeService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file) {
    writeFile(file.originalname, file.buffer);
    return file.originalname;
  }

  @Get('download')
  async downPhoto(@Query('filename') filename: string) {
    // include it in method parameter @Res() res: Response
    // return res.sendFile(filename, { root: './photos' });
    // console.log(filename);
    const filedata = await readFile(filename);
    // return filedata;
    return { filename, filedata, message: 'file downloaded' };
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() body: dto.CreateEmployeeDto, @UploadedFile() file: Express.Multer.File) {
    console.log(body, file);
    // const size = file.buffer.length / (1024 * 1024);
    // console.log((Math.round(size * 100) / 100) + 'MB');
    return await this.empService.create(classToPlain(body), file);
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
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() body: dto.UpdateEmployeeDto, @UploadedFile() file: Express.Multer.File) {
    return await this.empService.update(id, classToPlain(body), file);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return await this.empService.delete(id);
  }
}
