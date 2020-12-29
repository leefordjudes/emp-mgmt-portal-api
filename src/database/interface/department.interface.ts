import { Document } from 'mongoose';

export interface Department extends Document {
  id: string;
  name: string;
}