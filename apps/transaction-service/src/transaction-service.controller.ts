import { Controller, Get } from '@nestjs/common';
import { TransactionServiceService } from './transaction-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { JsonPayload } from 'src/generated/transaction';

@Controller()
export class TransactionServiceController {
  constructor(private readonly transactionServiceService: TransactionServiceService) {}

    @GrpcMethod('TransactionService', 'HealthCheck')
    async healthCheck(): Promise<JsonPayload> {
      const result = {
        status: 200,
        message: 'TRANSACTION MS - - ACTIVE',
        timestamp: new Date().toISOString()
      };
      return { json: JSON.stringify(result)};
    }
}
