import { IsDateString, IsISO8601, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsMongoId()
  department: string;

  @IsISO8601()
  @IsDateString()
  @IsOptional()
  doj: Date;

  @IsOptional()
  @IsString()
  photoFileName: string;
}