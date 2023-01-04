import { Injectable } from '@nestjs/common';
import { RegisterDto } from '@/dtos/users.dto';
import { UsersService } from './users.service';
import { errors } from '@/utils/errors';
import { User } from '@/entities/users.entity';
import { genSalt, hash } from 'bcrypt';
import { ExceptionWithMessage } from '@/exceptions/HttpException';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async register(registerDto: RegisterDto) {
        const check = await this.userService.findByEmail(registerDto.email);

        if (check)
            throw new ExceptionWithMessage(
                errors.EMAIL_EXIST.detail,
                400,
                errors.EMAIL_EXIST.code,
                'Register Fail',
            ); // error
        const user = new User();
        user.email = registerDto.email;

        const salt = await genSalt(10);
        user.password = await hash(registerDto.password, salt);
        const userData = await user.save();

        return userData;
    }
}
