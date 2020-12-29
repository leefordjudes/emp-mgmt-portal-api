import { IsDateString, IsISO8601, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ISO_8601 } from 'moment';

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  department: string;

  @IsISO8601()
  @IsDateString()
  doj: Date;

  @IsOptional()
  @IsString()
  photoFileName: string;
}