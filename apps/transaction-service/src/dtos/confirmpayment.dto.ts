import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { JsonPayload } from 'src/generated/transaction';

export class ConfirmPaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentIntentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentmethod: string;
}
