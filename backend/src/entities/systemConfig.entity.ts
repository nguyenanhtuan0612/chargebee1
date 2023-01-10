import {
    AutoIncrement,
    Column,
    CreatedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'system_configs',
    timestamps: true,
})
export class SystemConfig extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    discountForColaborator: number;

    @Column({ defaultValue: 23000 })
    exchangeRate: number;

    @Column
    secureToken: string;

    @Column({ defaultValue: false })
    active: boolean;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;
}
