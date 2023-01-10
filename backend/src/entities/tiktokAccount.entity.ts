import {
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import { AccountCategoryLinks } from './accountCategoryLink.entity';
import { Category } from './categories.entity';
import { Transaction } from './transaction.entity';
import { User } from './users.entity';

@Table({
    tableName: 'tiktok_account',
    timestamps: true,
})
export class TiktokAccount extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Unique
    @Column
    username: string;

    @Column
    password: string;

    @Column({ defaultValue: 0 })
    tiktokCoin: number;

    @Column({ defaultValue: 0 })
    follower: number;

    @Column({ defaultValue: 0 })
    like: number;

    @Column
    title: string;

    @Column
    subTitle: string;

    @Column
    price: number;

    @Column
    image: string;

    @Column
    link: string;

    @Column({ defaultValue: true })
    active: boolean;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    ownedBy: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(() => User)
    owner: User;

    @BelongsToMany(() => Category, () => AccountCategoryLinks)
    categories: Category[];

    @HasOne(() => Transaction)
    transaction: Transaction;
}
