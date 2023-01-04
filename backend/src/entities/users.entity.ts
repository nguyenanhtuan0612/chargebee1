import {
    AutoIncrement,
    Column,
    CreatedAt,
    IsEmail,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;
}
