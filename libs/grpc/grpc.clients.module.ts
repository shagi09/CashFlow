import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

//**USER CLIENT */
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(process.cwd(), 'proto/auth.proto'),
          url: process.env.AUTH_SERVICE || 'localhost:4001',
        },
      },
    ]),
  ],

  exports: [ClientsModule],
})
export class AuthClientsModule {}

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSACTION_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'transaction',
          protoPath: join(process.cwd(), 'proto/transaction.proto'),
          url: process.env.TRANSACTION_SERVICE || 'localhost:4001',
        },
      },
    ]),
  ],

  exports: [ClientsModule],
})
export class TransactionClientsModule {}

