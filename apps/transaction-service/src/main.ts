import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TransactionServiceModule } from './transaction-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TransactionServiceModule, {
    transport: Transport.GRPC,
    options: {
      package: 'transaction',
      protoPath: join(process.cwd(), '/proto/transaction.proto'),
      url: 'localhost:4001',  // <-- RUNS gRPC SERVER HERE
    },
  });

  await app.listen();
  console.log('🚀 Transaction gRPC service running on 4001');
}
bootstrap();
