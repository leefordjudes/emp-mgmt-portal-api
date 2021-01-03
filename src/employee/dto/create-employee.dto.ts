import { IsDateString, IsISO8601, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  department: string;

  @IsOptional()
  @IsISO8601()
  @IsDateString()
  doj: Date;

  @IsOptional()
  @IsString()
  photoFileName: string;
}