import { AuthService } from '@/services/auth.service';
import { LoginDto, RegisterDto } from '@dtos/users.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Authoriztion')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('/register')
    async create(@Res() res: Response, @Body() registerDto: RegisterDto) {
        try {
            const rs = await this.service.register(registerDto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @Post('/login')
    async login(@Res() res: Response, @Body() dto: LoginDto) {
        try {
            const rs = await this.service.login(dto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
}
