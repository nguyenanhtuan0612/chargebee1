import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { TiktokAccount } from './tiktokAccount.entity';
import { User } from './users.entity';

@Table({
    tableName: 'transactions',
    timestamps: true,
})
export class Transaction extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;

    @ForeignKey(() => TiktokAccount)
    @Column
    tiktokAccountId: number;

    @Column
    price: number;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => TiktokAccount)
    tiktokAccount: TiktokAccount;
}
