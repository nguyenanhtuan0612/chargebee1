import { Injectable, OnModuleInit } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { UpdateConfigDto } from './dtos/systemConfigs.dto';
import { Category } from './entities/categories.entity';
import { SystemConfig } from './entities/systemConfig.entity';
import { User } from './entities/users.entity';
import {
    Role,
    SECURE_TOKEN_DEFAULT,
    TIKTOK_ACCOUNT_COIN_CATEGORY,
} from './utils/constants';

@Injectable()
export class AppService implements OnModuleInit {
    async onModuleInit() {
        try {
            const data = await User.findOne({
                where: { email: 'admin@gmail.com' },
            });
            if (!data) {
                const user = new User();
                user.email = 'admin@gmail.com';

                const salt = await genSalt(10);
                user.password = await hash('123456', salt);
                user.role = Role.ADMIN;
                user.active = true;
                await user.save();
            }

            const config = await SystemConfig.findOne({
                where: { active: true },
            });
            if (!config) {
                const config = new SystemConfig();
                config.discountForColaborator = 10;
                config.exchangeRate = 23000;
                config.active = true;
                config.accountName = 'NGUYEN ANH TUAN';
                config.accountNumber = '0680106121998';
                config.bankName = 'NGÂN HÀNG QUÂN ĐỘI - MBB';
                config.secureToken = SECURE_TOKEN_DEFAULT;
                await config.save();
            }

            const categoryCoin = await Category.findOne({
                where: { name: TIKTOK_ACCOUNT_COIN_CATEGORY },
            });
            if (!categoryCoin) {
                const data = new Category();
                data.name = TIKTOK_ACCOUNT_COIN_CATEGORY;
                data.active = true;
                await data.save();
            }
            return;
        } catch (error) {
            console.log(error);
        }
    }

    getHello(): string {
        return 'Hello World!';
    }

    async configs() {
        const config = (await SystemConfig.findOne({
            where: { active: true },
        })) || { discountForColaborator: 10, exchangeRate: 23000 };

        return config;
    }

    async updateConfigs(dto: UpdateConfigDto) {
        const config = await SystemConfig.findOne({
            where: { active: true },
        });
        if (config) {
            config.exchangeRate = dto.exchangeRate;
            config.discountForColaborator = dto.discountForColaborator;
            config.accountName = dto.accountName;
            config.accountNumber = dto.accountNumber;
            config.bankName = dto.bankName;
            config.secureToken = dto.secureToken;
            const newConfig = await config.save();
            return newConfig;
        } else {
            const config = new SystemConfig();
            config.discountForColaborator = 10;
            config.exchangeRate = 23000;
            config.active = true;
            config.accountName = 'NGUYEN ANH TUAN';
            config.accountNumber = '0680106121998';
            config.bankName = 'NGÂN HÀNG QUÂN ĐỘI - MBB';
            config.secureToken = SECURE_TOKEN_DEFAULT;

            const newConfig = await config.save();
            return newConfig;
        }
    }
}
