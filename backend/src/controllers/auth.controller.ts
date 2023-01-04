import { AuthService } from '@/services/auth.service';
import { RegisterDto } from '@dtos/users.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

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
}
