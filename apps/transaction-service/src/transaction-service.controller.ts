import { Controller } from '@nestjs/common';
import { TransactionServiceService } from './transaction-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { JsonPayload } from 'src/generated/transaction';
import Stripe from 'stripe';

@Controller()
export class TransactionServiceController {
  private readonly stripe: Stripe;

  constructor(
    private readonly transactionServiceService: TransactionServiceService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  @GrpcMethod('TransactionService', 'healthCheck')
  async healthCheck(): Promise<JsonPayload> {
    const result = {
      status: 200,
      message: 'TRANSACTION MS - - ACTIVE',
      timestamp: new Date().toISOString()
    };
    console.log('Stripe key:', process.env.STRIPE_SECRET_KEY);

    return { json: JSON.stringify(result) };
  }

@GrpcMethod('TransactionService', 'createPaymentIntent')
async createPaymentIntent(data: any) {
  const body = JSON.parse(data.json);  // <-- FIX
  console.log("Received body:", body);

  const { amount, currency, orderId } = body;

  const intent = await this.stripe.paymentIntents.create({
    amount,
    currency,
    metadata: { orderId },
  });

  return {
    json: JSON.stringify({
      paymentIntentId: intent.id,
      clientSecret: intent.client_secret,
      status: intent.status,
      message: 'PaymentIntent created',
    })
  };
}

}
