import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsProcessor } from './sms.processor';
import { SerialportModule } from 'src/serialport/serialport.module';
import { SmsController } from './sms.controller';

@Module({
  imports: [SerialportModule],
  providers: [SmsProcessor, SmsService],
  exports: [SmsService],
  controllers: [SmsController],
})
export class SmsModule {}
