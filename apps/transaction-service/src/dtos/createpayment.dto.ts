import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
  
  @ApiProperty()
  @IsString()
  currency: string;

  //@ApiProperty()
  @IsString()
  customerId?: string;
}
