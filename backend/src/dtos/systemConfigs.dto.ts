import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateConfigDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    exchangeRate: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    discountForColaborator: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    secureToken: string;
}

export class ImportTiktokAccountCoinDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
