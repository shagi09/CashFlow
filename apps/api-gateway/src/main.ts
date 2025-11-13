import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // Use uppercase PORT (Node convention) and default to 4000
  const port = process.env.PORT || 4000;

  await app.listen(port);
  console.log(`🚀 gateway is running on port ${port}`);
}

bootstrap();
