import { Body, Controller, Get, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { Roles } from './decorators/roles.decorator';
import { UpdateConfigDto } from './dtos/systemConfigs.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { Role } from './utils/constants';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('configs')
    async configs(@Res() res: Response) {
        try {
            const data = await this.appService.configs();
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    @ApiBearerAuth('authorization')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles([Role.ADMIN])
    @Put('updateConfig')
    async updateConfig(@Res() res: Response, @Body() dto: UpdateConfigDto) {
        try {
            const data = await this.appService.updateConfigs(dto);
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }
}
