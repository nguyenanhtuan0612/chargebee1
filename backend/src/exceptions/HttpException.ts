import { HttpException } from '@nestjs/common';

export class ExceptionWithMessage extends HttpException {
    public message: string;
    public code: number;

    constructor(
        response: any,
        status: number,
        code?: number,
        message?: string,
    ) {
        super(response, status);
        this.code = code || 999;
        this.message = message || 'Something went wrong';
    }
}
