import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConfigs } from './config';
import { AllExceptionFilter } from './exceptions/exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({}));
    app.useGlobalFilters(new AllExceptionFilter());
    await app.listen(appConfigs().port || 80);
}
bootstrap();
