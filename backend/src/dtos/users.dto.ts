import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}

export class CreateUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}
