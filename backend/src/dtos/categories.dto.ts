import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    image: string;

    @ApiPropertyOptional()
    @IsBoolean()
    active: boolean;
}

export class UpdateCategoryDto {
    @ApiPropertyOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    image: string;

    @ApiPropertyOptional()
    @IsBoolean()
    active: boolean;
}
