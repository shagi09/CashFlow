import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TransactionServiceModule } from './transaction-service.module';
import * as express from 'express';

async function bootstrap() {
  // -------------------------
  // 1️⃣ Create Nest app for HTTP (webhooks)
  // -------------------------
  const app = await NestFactory.create(TransactionServiceModule);

  // Stripe requires raw body for webhook signature verification
  app.use('/stripe/webhook', express.raw({ type: 'application/json' }));

  // Optional: register your StripeWebhookController
  // Your controller should handle /stripe/webhook POST

  // Start HTTP server for webhook
  const HTTP_PORT = 4002;
  await app.listen(HTTP_PORT);
  console.log(`🚀 HTTP server running on port ${HTTP_PORT} (Stripe webhook)`);

  // -------------------------
  // 2️⃣ Connect gRPC microservice
  // -------------------------
  const grpcApp = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'transaction', // proto package name
      protoPath: join(process.cwd(), '/proto/transaction.proto'),
      url: 'localhost:4001', // gRPC listens here
    },
  });

  await app.startAllMicroservices();
  console.log(`🚀 gRPC Transaction service running on port 4001`);
}

bootstrap();
