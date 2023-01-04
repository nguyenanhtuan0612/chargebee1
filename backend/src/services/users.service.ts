import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/entities/users.entity';
import { IUser } from '@/interfaces/users.interface';
import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        const salt = await genSalt(10);
        user.password = await hash(createUserDto.password, salt);

        const userData: IUser = await user.save();

        return userData;
    }

    async findByEmail(email: string): Promise<User | null> {
        return User.findOne({
            where: { email },
        });
    }
}
