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
import { User } from './users.entity';

@Table({
    tableName: 'payments',
    timestamps: true,
})
export class Payment extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    cassoId: number;

    @Column
    amount: number;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(() => User)
    user: User;
}
