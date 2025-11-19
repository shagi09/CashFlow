import {
  Controller,
  Post,
  Req,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeWebhookController {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  @Post('webhook')
  async handleStripeWebhook(
    @Req() request: any,
    @Headers('stripe-signature') signature: string
  ) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret,
      );
    } catch (err) {
      throw new BadRequestException(`Webhook signature error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const intent = event.data.object;
        console.log('Payment succeeded:', intent.id);
        break;

      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;
    }

    return { received: true };
  }
}
