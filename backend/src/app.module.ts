import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigs, authConfigs } from '@/config';
import { PostgreSqlModule } from '@databases';
import { JwtModule } from '@nestjs/jwt';
import UsersController from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { QueryMiddleware } from './middlewares/query.middleware';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TiktokController } from './controllers/tiktokAccount.controller';
import { TiktokAccountServie } from './services/tiktokAccount.service';
import { JwtStrategy } from './strategies/jwt.strategy';
const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfigs, authConfigs],
            envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: authConfigs().jwtSecretKey,
            }),
            inject: [ConfigService],
        }),
        PostgreSqlModule,
    ],
    controllers: [
        AppController,
        UsersController,
        AuthController,
        TiktokController,
    ],
    providers: [
        AppService,
        JwtStrategy,
        UsersService,
        AuthService,
        TiktokAccountServie,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
        consumer
            .apply(QueryMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.GET });
    }
    constructor() {
        console.log(appConfigs());
    }
}
