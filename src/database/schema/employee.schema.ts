import { Schema } from 'mongoose';
//https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
//https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose/29780816
export const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    doj: {
      type: Date,
      required: true,
    },
    photoFileName: String,
  }
);