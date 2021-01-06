import { IsDateString, IsISO8601, IsMongoId, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PaymentDetailDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  cardOwnerName: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(16)
  @MinLength(16)
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  @MinLength(5)
  expirationDate: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  @MinLength(3)
  securityCode: string;
}