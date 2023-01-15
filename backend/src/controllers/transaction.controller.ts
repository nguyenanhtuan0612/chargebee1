import { Roles } from '@/decorators/roles.decorator';
import { BuyAccountDto } from '@/dtos/transaction.dto';
import { JwtAuthGuard } from '@/guards/jwt.guard';
import { RolesGuard } from '@/guards/role.guard';
import { RequestWithUserOption } from '@/interfaces/auth.interface';
import { ICassoPaymentHookData } from '@/interfaces/webhook.interface';
import { TransactionService } from '@/services/transaction.service';
import { Role } from '@/utils/constants';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
            console.log(dto);
            const secureToken = req.headers['secure-token'] as string;
            const data = await this.service.cassoHook(dto, secureToken);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.COLABORATOR, Role.CUSTOMER])
    @Post('/buyAccount')
    async buyAccount(
        @Res() res: Response,
        @Body() dto: BuyAccountDto,
        @Req() req: RequestWithUserOption,
    ) {
        try {
            const data = await this.service.buyAccount(req.auth, dto);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiQuery({
        name: 'offset',
        description: '0',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        description: '10',
        required: false,
    })
    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Get('/listPaymentByUser/:id')
    async listPaymentByUser(
        @Res() res: Response,
        @Param('id') id: string,
        @Req() req: RequestWithUserOption,
    ) {
        try {
            const data = await this.service.listPaymentByUser(id, req.options);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiQuery({
        name: 'offset',
        description: '0',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        description: '10',
        required: false,
    })
    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Get('/listTransactionByUser/:id')
    async listTransactionByUser(
        @Res() res: Response,
        @Param('id') id: string,
        @Req() req: RequestWithUserOption,
    ) {
        try {
            const data = await this.service.listTransactionByUser(
                id,
                req.options,
            );
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiQuery({
        name: 'offset',
        description: '0',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        description: '10',
        required: false,
    })
    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard)
    @Get('/myPayment')
    async myPayment(@Res() res: Response, @Req() req: RequestWithUserOption) {
        try {
            const data = await this.service.listPaymentByUser(
                req.auth.id,
                req.options,
            );
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiQuery({
        name: 'offset',
        description: '0',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        description: '10',
        required: false,
    })
    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard)
    @Get('/myTransaction')
    async myTransaction(
        @Res() res: Response,
        @Req() req: RequestWithUserOption,
    ) {
        try {
            const data = await this.service.listTransactionByUser(
                req.auth.id,
                req.options,
            );
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }
}
