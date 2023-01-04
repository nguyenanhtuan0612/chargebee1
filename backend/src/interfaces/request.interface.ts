import { Request } from 'express';

export interface Options {
    where?: any;
    limit: number;
    offset: number;
    order?: any;
}

export interface RequestWithOptions extends Request {
    options: Options;
}
