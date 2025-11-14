import { Controller, Get, OnModuleInit,Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthClientsModule } from 'libs/grpc/grpc.clients.module';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { JsonPayload } from 'src/generated/transaction';
import { TransactionServiceClient } from 'src/generated/transaction';


@Controller('transaction')
export class ApiGatewayTransactionController implements OnModuleInit {
  private transactionService: TransactionServiceClient;

  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly transactionClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.transactionService = this.transactionClient.getService<TransactionServiceClient>('TransactionService');
  }
  
  // ===================================
  // === USERS ENDPOINTS    ===
  // ===================================
  @Get('healthcheck')
  healthCheck(): Observable<any> {
      const payload: JsonPayload = { json: JSON.stringify({}) };
      return this.transactionService.healthCheck(payload).pipe(
      map(response => JSON.parse(response.json))
      );
  }
}
