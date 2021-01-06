import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import * as moment from 'moment';
import { writeFile, readFile, removeFile } from '../shared/utils';

import { DatabaseService } from '../database/database.service';
import { Types } from 'mongoose';

@Injectable()
export class PaymentDetailService {
  constructor(private db: DatabaseService) { }

  async create(data: any) {
    try {
      const pd = await this.db.paymentDetailModel.create(data);
      return await this.get(pd.id);
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async update(id: string, data: any) {
    const exPd = await this.db.paymentDetailModel.findById(id);
    if (!exPd) {
      throw new BadRequestException('Invalid payment detail found');
    }
    try {
      for (const val in data) {
        exPd[val] = data[val];
      }
      await exPd.save();
      return await this.get(id);
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async get(id: string) {
    const result = await this.db.paymentDetailModel.findById(id);
    if (!result) {
      throw new NotFoundException('Payment detail not found');
    }
    return _.pick(result, ['id', 'cardOwnerName', 'cardNumber', 'expirationDate', 'securityCode']);
  }

  async list() {
    const results = await this.db.paymentDetailModel.find({});
    return _.map(results, x => _.pick(x, ['id', 'cardOwnerName', 'cardNumber', 'expirationDate', 'securityCode']));
  }

  async deletePaymentDetail(id: string) {
    const result = await this.db.paymentDetailModel.deleteOne({ _id: Types.ObjectId(id) });
    if (result.deletedCount !== 1) {
      throw new NotFoundException('Payment detail not found');
    }
    return { message: 'Payment detail deleted.' };
  }
}
