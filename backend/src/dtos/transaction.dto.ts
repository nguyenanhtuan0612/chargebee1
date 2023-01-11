import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BuyAccountDto {
    @ApiProperty()
    @IsNumber()
    tiktokAcountId: number;

    @ApiProperty()
    @IsNumber()
    price: number;
}
