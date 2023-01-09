import { AddAccountDto, UpdateAccountDto } from '@/dtos/tiktokAccount.dto';
import { AccountCategoryLinks } from '@/entities/accountCategoryLink.entity';
import { Category } from '@/entities/categories.entity';
import { TiktokAccount } from '@/entities/tiktokAccount.entity';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { Options } from '@/interfaces/request.interface';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TiktokAccountServie {
    async create(dto: AddAccountDto) {
        const data = new TiktokAccount();
        data.username = dto.username;
        data.password = dto.password;
        data.like = dto.like;
        data.follower = dto.follower;
        data.tiktokCoin = dto.tiktokCoin;
        data.title = dto.title;
        data.subTitle = dto.subTitle;
        data.price = dto.price;
        data.image = dto.image;
        data.link = dto.link;
        const res = await data.save();
        for (const iterator of dto.categories) {
            const cate = await Category.findByPk(iterator);
            if (cate) {
                const link = new AccountCategoryLinks();
                link.categoryId = cate.id;
                link.tiktokAccountId = res.id;
                await link.save();
            }
        }

        return res;
    }

    async update(id: number, dto: UpdateAccountDto) {
        let data = await TiktokAccount.findByPk(id);
        if (!data) {
            throw new ExceptionWithMessage(errors.ACCOUNT_NOT_FOUND, 404);
        }
        await TiktokAccount.update(dto, { where: { id: data.id } });
        if (dto.categories) {
            await AccountCategoryLinks.destroy({
                where: {
                    tiktokAccountId: data.id,
                },
            });

            for (const iterator of dto.categories) {
                const cate = await Category.findByPk(iterator);
                if (cate) {
                    const link = new AccountCategoryLinks();
                    link.categoryId = cate.id;
                    link.categoryId = data.id;
                    await link.save();
                }
            }
        }

        data = await TiktokAccount.findByPk(id, {
            include: [{ model: Category }],
        });
        return data;
    }

    async detail(id: number) {
        const data = await TiktokAccount.findByPk(id, {
            include: [{ model: User }],
        });
        if (!data) {
            throw new ExceptionWithMessage(errors.ACCOUNT_NOT_FOUND, 404);
        }

        return data;
    }

    async list(options: Options) {
        const data = await TiktokAccount.findAndCountAll({
            ...options,
            attributes: [
                'id',
                'username',
                'tiktokCoin',
                'follower',
                'like',
                'ownedBy',
                'title',
                'subTitle',
                'price',
            ],
        });

        return data;
    }

    async delete(id: number) {
        const data = await TiktokAccount.findByPk(id, {
            include: [{ model: User }],
        });
        if (!data) {
            throw new ExceptionWithMessage(errors.ACCOUNT_NOT_FOUND, 404);
        }
        await data.destroy();

        return data;
    }
}
