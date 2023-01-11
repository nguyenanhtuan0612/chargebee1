import { Roles } from '@/decorators/roles.decorator';
import { ImportTiktokAccountCoinDto } from '@/dtos/systemConfigs.dto';
import { AddAccountDto, UpdateAccountDto } from '@/dtos/tiktokAccount.dto';
import { JwtAuthGuard } from '@/guards/jwt.guard';
import { RolesGuard } from '@/guards/role.guard';
import { RequestWithUserOption } from '@/interfaces/auth.interface';
import { TiktokAccountServie } from '@/services/tiktokAccount.service';
import { Role } from '@/utils/constants';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('TiktokAccount')
@Controller('tiktokAccount')
export class TiktokController {
    constructor(private readonly service: TiktokAccountServie) {}

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Post()
    async create(@Res() res: Response, @Body() dto: AddAccountDto) {
        try {
            const data = await this.service.create(dto);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Put('/update/:id')
    async update(
        @Res() res: Response,
        @Param('id') id: number,
        @Body() dto: UpdateAccountDto,
    ) {
        try {
            const data = await this.service.update(id, dto);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Get('/detail/:id')
    async detail(@Res() res: Response, @Param('id') id: number) {
        try {
            const data = await this.service.detail(id);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiQuery({
        name: 'filter',
        description:
            '[{"operator":"search","value":"provai","prop":"email,fullName"},{"operator":"eq","value":"887c1870-3000-4110-9426-89afa8724d69","prop":"id"}]',
        required: false,
    })
    @ApiQuery({
        name: 'sort',
        description: '[{"direction":"DESC","prop":"createdAt"}]',
        required: false,
    })
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
    @Get()
    async list(@Res() res: Response, @Req() req: RequestWithUserOption) {
        try {
            const { options } = req;
            const data = await this.service.list(options);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiQuery({
        name: 'filter',
        description:
            '[{"operator":"search","value":"provai","prop":"email,fullName"},{"operator":"eq","value":"887c1870-3000-4110-9426-89afa8724d69","prop":"id"}]',
        required: false,
    })
    @ApiQuery({
        name: 'sort',
        description: '[{"direction":"DESC","prop":"createdAt"}]',
        required: false,
    })
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
    @Get('listByCategory/:id')
    async listByCategory(
        @Res() res: Response,
        @Req() req: RequestWithUserOption,
        @Param('id') id: number,
    ) {
        try {
            const { options } = req;
            const data = await this.service.listByCategory(id, options);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiQuery({
        name: 'filter',
        description:
            '[{"operator":"search","value":"provai","prop":"email,fullName"},{"operator":"eq","value":"887c1870-3000-4110-9426-89afa8724d69","prop":"id"}]',
        required: false,
    })
    @ApiQuery({
        name: 'sort',
        description: '[{"direction":"DESC","prop":"createdAt"}]',
        required: false,
    })
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
    @Get('listTiktokAccountCoin')
    async listTiktokAccountCoin(
        @Res() res: Response,
        @Req() req: RequestWithUserOption,
    ) {
        try {
            const { options } = req;
            const data = await this.service.listTiktokAccountCoin(options);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Delete('/delete/:id')
    async delete(@Res() res: Response, @Param('id') id: number) {
        try {
            const data = await this.service.delete(id);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Post('importTiktokAccountCoin')
    @UseInterceptors(FileInterceptor('file'))
    async importTiktokAccountCoin(
        @Body() importDto: ImportTiktokAccountCoinDto,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: any,
    ) {
        try {
            const rs = await this.service.importTiktokAccountCoin(file);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
}
