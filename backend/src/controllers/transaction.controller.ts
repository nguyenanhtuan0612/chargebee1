import { ICassoPaymentHookData } from '@/interfaces/webhook.interface';
import { TransactionService } from '@/services/transaction.service';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Transaction')
@Controller('transactions')
export class TransactionController {
    constructor(private readonly service: TransactionService) {}

    @Post('/cassoWebhook')
    async create(
        @Res() res: Response,
        @Body() dto: ICassoPaymentHookData,
        @Req() req: Request,
    ) {
        try {
            const secureToken = req.headers['secure-token'] as string;
            const data = await this.service.cassoHook(dto, secureToken);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }
}
