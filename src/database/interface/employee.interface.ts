import { Document } from 'mongoose';

export interface Employee extends Document {
  id: string;
  name: string;
  department: string;
  doj: Date;
  photoFileName: string;
}