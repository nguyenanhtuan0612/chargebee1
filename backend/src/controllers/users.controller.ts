import { CreateUserDto } from '@dtos/users.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from '@/services/users.service';

@Controller('users')
class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
        try {
            const rs = await this.usersService.create(createUserDto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
}

export default UsersController;
