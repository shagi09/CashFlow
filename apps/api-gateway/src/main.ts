import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  

    const config = new DocumentBuilder()
    .setTitle('Cashflow API')
    .setDescription('API documentation for the Cashflow system')
    .setVersion('1.0')
    .addBearerAuth()   // optional: if using JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Use uppercase PORT (Node convention) and default to 4000
  const port = process.env.PORT || 4000;

  await app.listen(port);
  console.log(`🚀 gateway is running on port ${port}`);
  console.log(`📘 Swagger docs available at http://localhost:${port}/docs`);
}

bootstrap();
