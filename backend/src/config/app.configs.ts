import { parseBool } from '@/utils/util';
import { Dialect } from 'sequelize/types';

export default () => ({
    port: parseInt(process.env.PORT) || 5000,
    appUrl: process.env.APP_URL,
    postgres: {
        dialect: 'postgres' as Dialect,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: process.env.DB_LOGGING,
        synchronize: parseBool(process.env.DB_SYNC),
        autoLoadModels: parseBool(process.env.DB_AUTO_LOAD),
    },
});
