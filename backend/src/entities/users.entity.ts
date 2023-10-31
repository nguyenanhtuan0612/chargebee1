import { Role, Type } from '@/utils/constants';
import {
    Column,
    CreatedAt,
    DataType,
    HasMany,
    IsEmail,
    Model,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import { Payment } from './payment.entity';
import { TiktokAccount } from './tiktokAccount.entity';
import { Transaction } from './transaction.entity';

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column({ defaultValue: 0 })
    balance: number;

    @Column({ defaultValue: Role.CUSTOMER })
    role: string;

    @Column({ defaultValue: Type.BASIC })
    type: string;

    @Column({ defaultValue: true })
    active: boolean;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @HasMany(() => TiktokAccount)
    tiktokAccounts: TiktokAccount[];

    @HasMany(() => Payment)
    payments: Payment[];

    @HasMany(() => Transaction)
    transactions: Transaction[];
}
