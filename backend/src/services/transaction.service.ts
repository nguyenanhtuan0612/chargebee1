import { BuyAccountDto } from '@/dtos/transaction.dto';
import { Payment } from '@/entities/payment.entity';
import { SystemConfig } from '@/entities/systemConfig.entity';
import { TiktokAccount } from '@/entities/tiktokAccount.entity';
import { Transaction } from '@/entities/transaction.entity';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { Options } from '@/interfaces/request.interface';
import { IUser } from '@/interfaces/users.interface';
import { ICassoPaymentHookData } from '@/interfaces/webhook.interface';
import { errors } from '@/utils/errors';
import { getEmailFromSms } from '@/utils/util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
    async cassoHook(dto: ICassoPaymentHookData, secureToken: string) {
        const config = await SystemConfig.findOne({ where: { active: true } });
        if (!config) {
            return 'not found config';
        }
        if (secureToken !== config.secureToken) {
            throw new ExceptionWithMessage(errors.FORBIDDEN_RESOURCE, 403);
        }

        for (const iterator of dto.data) {
            const email = getEmailFromSms(iterator.description);
            console.log(email);
            if (!email) {
                console.log('cant not get email: ', iterator.description);
                return 'can not get email';
            }
            const user = await User.findOne({
                where: { email: email },
            });
            if (!user) {
                return 'user not found';
            }

            const oldPayment = await Payment.findOne({
                where: { cassoId: iterator.id },
            });
            if (oldPayment) {
                return 'oldPayment';
            }

            const payment = new Payment();
            payment.amount = iterator.amount;
            payment.userId = user.id;
            payment.cassoId = iterator.id;
            await payment.save();

            user.balance = user.balance + iterator.amount;
            await user.save();
        }
        return 'ok';
    }

    async listPaymentByUser(id: string, options: Options) {
        const { limit, offset } = options;
        const data = await Payment.findAndCountAll({
            where: { userId: id },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        return data;
    }

    async buyAccount(user: IUser, dto: BuyAccountDto) {
        if (dto.price > user.balance) {
            throw new ExceptionWithMessage(errors.BALANCE_NOT_ENOUGH, 400);
        }

        const account = await TiktokAccount.findByPk(dto.tiktokAcountId);
        if (!account) {
            throw new ExceptionWithMessage(errors.ACCOUNT_NOT_FOUND, 404);
        }

        await User.update(
            { balance: user.balance - dto.price },
            {
                where: {
                    id: user.id,
                },
            },
        );

        account.ownedBy = user.id;
        await account.save();

        const transaction = new Transaction();
        transaction.price = dto.price;
        transaction.tiktokAccountId = dto.tiktokAcountId;
        transaction.userId = user.id;
        await transaction.save();

        return account;
    }

    async listTransactionByUser(id: string, options: Options) {
        const { limit, offset } = options;
        const data = await Transaction.findAndCountAll({
            where: { userId: id },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [{ model: TiktokAccount }],
        });

        return data;
    }
}
