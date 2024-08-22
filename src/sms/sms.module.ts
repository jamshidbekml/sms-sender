import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsProcessor } from './sms.processor';
import { SerialportModule } from 'src/serialport/serialport.module';
import { SmsController } from './sms.controller';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { Queue } from 'bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'sms',
    }),
    SerialportModule,
  ],
  providers: [SmsProcessor, SmsService],
  exports: [SmsService],
  controllers: [SmsController],
})
export class SmsModule implements NestModule {
  private serverAdapter: ExpressAdapter;

  constructor(@InjectQueue('sms') private readonly smsQueue: Queue) {
    this.serverAdapter = new ExpressAdapter();
    this.serverAdapter.setBasePath('/admin/queues');
    createBullBoard({
      queues: [new BullAdapter(this.smsQueue)],
      serverAdapter: this.serverAdapter,
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.serverAdapter.getRouter()).forRoutes('/admin/queues');
  }
}
