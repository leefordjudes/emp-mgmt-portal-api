import { Document } from 'mongoose';

export interface PaymentDetail extends Document {
  id: string;
  cardOwnerName: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}