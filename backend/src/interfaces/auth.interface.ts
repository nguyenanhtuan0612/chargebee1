import { IUser } from '@interfaces/users.interface';
import { Request } from 'express';

export interface DataStoredInToken {
    id: number;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface RequestWithUser extends Request {
    auth: IUser;
}
