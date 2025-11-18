import { Module } from '@nestjs/common';
import { ApiGatewayTransactionController } from './api-gateway.transaction.controller';
import { ApiGatewayService } from './api-gateway.service';
import { MongoDBConnectionModule } from 'libs/database/mongo.connection';
import {EventEmitterModule} from "@nestjs/event-emitter";
import { AuthClientsModule, TransactionClientsModule } from 'libs/grpc/grpc.clients.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [MongoDBConnectionModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env',
      },
    ),
    EventEmitterModule.forRoot(),
    AuthClientsModule,
    TransactionClientsModule,

  ],
  controllers: [ApiGatewayTransactionController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
