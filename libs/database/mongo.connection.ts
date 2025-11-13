import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/cashflow', {
      dbName: 'cashflow',
      retryAttempts: 5,
      retryDelay: 2000,
      connectionFactory: (connection) => {
        connection.on('connected', () => console.log('✅ Connected to MongoDB'));
        connection.on('error', (err) => console.error('❌ MongoDB connection error:', err));
        connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected'));
        return connection;
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDBConnectionModule {}
