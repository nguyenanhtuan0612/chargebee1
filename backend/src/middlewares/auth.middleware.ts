import { NextFunction, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/users.entity';
import { RequestWithUser } from '@interfaces/auth.interface';
import { errors } from '@/utils/errors';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { UserResponse } from '@/dtos/users.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    async use(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const Authorization =
                req.cookies['Authorization'] ||
                (req.header('Authorization')
                    ? req.header('Authorization').split('Bearer ')[1]
                    : null);

            if (Authorization) {
                const tokenDecode: any = this.jwtService.decode(Authorization);
                const findUser: User = await User.findOne(tokenDecode.id);

                if (findUser) {
                    req.auth = new UserResponse(findUser);
                    next();
                } else {
                    next(
                        new ExceptionWithMessage(
                            errors.LOGIN_ERROR_UNAUTHORIZE,
                            401,
                            'Wrong authentication token',
                        ),
                    );
                }
            } else {
                next(
                    new ExceptionWithMessage(
                        errors.LOGIN_ERROR_MISSING,
                        404,
                        'Authentication token missing',
                    ),
                );
            }
        } catch (error) {
            next(
                new ExceptionWithMessage(
                    errors.LOGIN_ERROR_UNAUTHORIZE,
                    401,
                    'Wrong authentication token',
                ),
            );
        }
    }
}
