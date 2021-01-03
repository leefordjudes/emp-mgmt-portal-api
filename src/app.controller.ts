import { Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('photos/:filename')
  getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './photos' });
  }
}
