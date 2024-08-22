import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SmsService } from './sms.service';
import { SmsProcessor } from './sms.processor';
import { SerialportModule } from 'src/serialport/serialport.module';
import { SmsController } from './sms.controller';

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
export class SmsModule {}
