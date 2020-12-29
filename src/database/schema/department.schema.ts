import { Schema } from 'mongoose';

export const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    }
  }
);
