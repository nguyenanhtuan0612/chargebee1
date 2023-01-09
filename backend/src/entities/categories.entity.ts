import {
    AutoIncrement,
    BelongsToMany,
    Column,
    CreatedAt,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import { AccountCategoryLinks } from './accountCategoryLink.entity';
import { TiktokAccount } from './tiktokAccount.entity';

@Table({
    tableName: 'category',
    timestamps: true,
})
export class Category extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Unique
    @Column
    name: string;

    @Column
    image: string;

    @Column({ defaultValue: true })
    active: boolean;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @BelongsToMany(() => TiktokAccount, () => AccountCategoryLinks)
    account: TiktokAccount[];
}
