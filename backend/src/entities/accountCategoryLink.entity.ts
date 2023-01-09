import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Category } from './categories.entity';
import { TiktokAccount } from './tiktokAccount.entity';

@Table({
    tableName: 'account_category_links',
    timestamps: true,
})
export class AccountCategoryLinks extends Model {
    @ForeignKey(() => TiktokAccount)
    @PrimaryKey
    @Column
    tiktokAccountId: number;

    @ForeignKey(() => Category)
    @PrimaryKey
    @Column
    categoryId!: number;

    @BelongsTo(() => TiktokAccount)
    account: TiktokAccount;

    @BelongsTo(() => Category)
    category: Category;
}
