import { Injectable } from '@nestjs/common';
import {
    LoginDto,
    RegisterDto,
    UserResponeWithToken,
    UserResponse,
} from '@/dtos/users.dto';
import { errors } from '@/utils/errors';
import { User } from '@/entities/users.entity';
import { compare, genSalt, hash } from 'bcrypt';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { authConfigs } from '@/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        const check = await User.findOne({
            where: { email: registerDto.email },
        });

        if (check)
            throw new ExceptionWithMessage(
                errors.EMAIL_EXIST,
                400,
                'Register Fail',
            ); // error
        const user = new User();
        user.email = registerDto.email;

        const salt = await genSalt(10);
        user.password = await hash(registerDto.password, salt);
        const userData = await user.save();

        return new UserResponse(userData);
    }

    async login(dto: LoginDto): Promise<UserResponeWithToken> {
        const user = await User.findOne({
            where: { email: dto.email, active: true },
        });
        if (user) {
            const compareResult = await compare(dto.password, user.password);
            if (compareResult) {
                const payload = {
                    email: user.email,
                    sub: user.id,
                };

                const tokenExpiresIn = authConfigs().jwtExpiresIn;
                const accessToken = await this.jwtService.signAsync(payload, {
                    expiresIn: tokenExpiresIn,
                });
                const refreshTokenExpiresIn = authConfigs().jwtRefreshExpiresIn;
                const refreshToken = await this.jwtService.signAsync(payload, {
                    secret: authConfigs().jwtRefreshTokenKey,
                    expiresIn: refreshTokenExpiresIn,
                });

                return new UserResponeWithToken(user, {
                    accessToken,
                    refreshToken,
                    tokenExpiresIn,
                    refreshTokenExpiresIn,
                });
            }
            throw new ExceptionWithMessage(
                errors.USERNAME_PASSWORD_INVALID,
                401,
                'Login Fail',
            );
        }
        throw new ExceptionWithMessage(
            errors.USERNAME_PASSWORD_INVALID,
            401,
            'Login Fail',
        );
    }
}
