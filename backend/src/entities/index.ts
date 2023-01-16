import { User } from './users.entity';
import { TiktokAccount } from './tiktokAccount.entity';
import { Category } from './categories.entity';
import { AccountCategoryLinks } from './accountCategoryLink.entity';
import { SystemConfig } from './systemConfig.entity';
import { Payment } from './payment.entity';
import { Transaction } from './transaction.entity';
import { CountUserRegister } from './countUserRegister.entity';
import { TransactionStatistic } from './transactionStatistics.entity';

export default [
    User,
    TiktokAccount,
    Category,
    AccountCategoryLinks,
    SystemConfig,
    Payment,
    Transaction,
    CountUserRegister,
    TransactionStatistic,
];
