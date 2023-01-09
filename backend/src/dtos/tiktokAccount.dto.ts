import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class AddAccountDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNumber()
    tiktokCoin: number;

    @ApiProperty()
    @IsNumber()
    follower: number;

    @ApiProperty()
    @IsNumber()
    like: number;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    subTitle: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    link: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    categories: number[];

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    active: boolean;
}

export class UpdateAccountDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    username: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    password: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    tiktokCoin: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    follower: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    like: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    title: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    subTitle: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiPropertyOptional()
    @IsString()
    link: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    image: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    categories: number[];

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    active: boolean;
}
