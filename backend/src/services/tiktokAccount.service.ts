import {
    AddAccountCoinDto,
    AddAccountDto,
    UpdateAccountDto,
} from '@/dtos/tiktokAccount.dto';
import { AccountCategoryLinks } from '@/entities/accountCategoryLink.entity';
import { Category } from '@/entities/categories.entity';
import { TiktokAccount } from '@/entities/tiktokAccount.entity';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import {
    IImportAccountFileData,
    Options,
} from '@/interfaces/request.interface';
import { TIKTOK_ACCOUNT_COIN_CATEGORY } from '@/utils/constants';
import { errors } from '@/utils/errors';
import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

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

    async createTiktokAccountCoin(dto: AddAccountCoinDto) {
        const data = new TiktokAccount();
        data.username = dto.username;
        data.password = dto.password;
        data.tiktokCoin = dto.tiktokCoin;
        const res = await data.save();
        const cate = await Category.findOne({
            where: { name: TIKTOK_ACCOUNT_COIN_CATEGORY },
        });
        if (cate) {
            const link = new AccountCategoryLinks();
            link.categoryId = cate.id;
            link.tiktokAccountId = res.id;
            await link.save();
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
            include: [{ model: User }, { model: Category }],
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

    async listByCategory(id: number, options: Options) {
        const { where, limit, order, offset } = options;

        const data = await TiktokAccount.findAndCountAll({
            where: {
                ...where,
                ownedBy: null,
                active: true,
            },
            limit,
            offset,
            order,
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
            include: [
                {
                    model: Category,
                    required: true,
                    through: {
                        where: { categoryId: id },
                    },
                },
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

    async importTiktokAccountCoin(file: Express.Multer.File) {
        let count = 0;
        let duplicate = 0;
        const wookbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheet = wookbook.Sheets[wookbook.SheetNames[0]];
        const arr: IImportAccountFileData[] = xlsx.utils.sheet_to_json(sheet, {
            header: 0,
            raw: true,
        });

        for (const iterator of arr) {
            const exist = await TiktokAccount.findOne({
                where: { username: iterator.email },
            });
            if (exist) {
                duplicate++;
                continue;
            }
            const data = new TiktokAccount();
            data.username = iterator.email;
            data.password = iterator.password;
            data.tiktokCoin = iterator.coin;
            data.like = iterator.like;
            data.follower = iterator.follower;
            data.title = iterator.title;
            data.subTitle = iterator.subTitle;
            data.price = iterator.price;
            data.image = iterator.image;
            data.link = iterator.link;
            const res = await data.save();

            const cate = await Category.findOne({
                where: { name: TIKTOK_ACCOUNT_COIN_CATEGORY },
            });
            if (cate) {
                const link = new AccountCategoryLinks();
                link.categoryId = cate.id;
                link.tiktokAccountId = res.id;
                await link.save();
            }
            count++;
        }

        return { count, duplicate };
    }

    async listTiktokAccountCoin(options: Options) {
        const { where, limit, order, offset } = options;

        const cate = await Category.findOne({
            where: { name: TIKTOK_ACCOUNT_COIN_CATEGORY },
        });
        if (!cate) {
            return { count: 0, rows: [] };
        }

        const data = await TiktokAccount.findAndCountAll({
            where: {
                ...where,
                ownedBy: null,
                active: true,
            },
            limit,
            offset,
            order,
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
            include: [
                {
                    model: Category,
                    required: true,
                    through: {
                        where: { categoryId: cate.id },
                    },
                },
            ],
        });

        return data;
    }
}
