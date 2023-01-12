import { UpdateAccountDto } from '@/dtos/tiktokAccount.dto';
import { CreateUserDto, UserResponse } from '@/dtos/users.dto';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { Options } from '@/interfaces/request.interface';
import { IUser } from '@/interfaces/users.interface';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        const salt = await genSalt(10);
        user.password = await hash(createUserDto.password, salt);
        user.role = createUserDto.role;

        const userData: IUser = await user.save();

        return userData;
    }

    async detail(id: string) {
        const userData = await User.findByPk(id);
        if (!userData) {
            throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
        }
        return new UserResponse(userData);
    }

    async banUser(id: string) {
        const userData = await User.findByPk(id);
        if (!userData) {
            throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
        }
        userData.active = false;
        await userData.save();
        return new UserResponse(userData);
    }

    async update(id: string, dto: UpdateAccountDto) {
        let userData = await User.findByPk(id);
        if (!userData) {
            throw new ExceptionWithMessage(errors.USER_NOT_FOUND, 404);
        }
        await User.update(dto, { where: { id } });

        userData = await User.findByPk(id);
        return new UserResponse(userData);
    }

    async list(options: Options) {
        const { limit, offset } = options;
        const data = await User.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        return data;
    }
}
