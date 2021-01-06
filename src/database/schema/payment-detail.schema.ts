import { Schema } from 'mongoose';
export const paymentDetailSchema = new Schema(
  {
    cardOwnerName: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    cardNumber: {
      type: String,
      maxlength: 16,
      minlength: 16,
      required: true,
      trim: true,
    },
    expirationDate: {
      type: String,
      maxlength: 5,
      minlength: 5,
      required: true,
      trim: true,
    },
    securityCode: {
      type: String,
      maxlength: 3,
      minlength: 3,
      required: true,
      trim: true,
    },
  }
);