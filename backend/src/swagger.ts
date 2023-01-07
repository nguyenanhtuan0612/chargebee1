import { INestApplication } from '@nestjs/common';
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerCustomOptions,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('Nest.js example API')
        .setDescription(
            'Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjRkMzU2MDdhLWFjYWEtNDc3NS05OGVhLTliMWRkYTVlYjg3MCIsImlhdCI6MTY3MzA2Mjg5OCwiZXhwIjoxNzA0NTk4ODk4fQ.hjnpzFJWG52YXKhX_n_bm1TYH5z77k6wC3_NNcR5Ii8',
        )
        .setVersion('2.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
            'authorization',
        )
        .build();

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            docExpansion: 'none',
        },
    };
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document, customOptions);
}
