import { NestFactory } from '@nestjs/core';
import { TransactionServiceModule } from './transaction-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionServiceModule);

  // Use uppercase PORT (Node convention) and default to 4000
  const port = process.env.PORT || 4001;

  await app.listen(port);
  console.log(`🚀 Transaction Service is running on port ${port}`);
}

bootstrap();
