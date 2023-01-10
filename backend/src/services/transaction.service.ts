import { Payment } from '@/entities/payment.entity';
import { SystemConfig } from '@/entities/systemConfig.entity';
import { User } from '@/entities/users.entity';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { ICassoPaymentHookData } from '@/interfaces/webhook.interface';
import { errors } from '@/utils/errors';
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
            const user = await User.findOne({
                where: { email: iterator.description },
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
}
