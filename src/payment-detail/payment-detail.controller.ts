import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { PaymentDetailService } from './payment-detail.service';
import * as dto from './dto';

@Controller('payment-detail')
export class PaymentDetailController {
  constructor(private paymentDetailService: PaymentDetailService) { }

  @Post('create')
  async create(@Body() body: dto.PaymentDetailDto) {
    return await this.paymentDetailService.create(classToPlain(body));
  }

  @Get('list')
  async list() {
    return await this.paymentDetailService.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.paymentDetailService.get(id);
  }

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() body: dto.PaymentDetailDto) {
    return await this.paymentDetailService.update(id, classToPlain(body));
  }

  @Delete(':id/delete')
  async deletePaymentDetail(@Param('id') id: string) {
    return await this.paymentDetailService.deletePaymentDetail(id);
  }
}
