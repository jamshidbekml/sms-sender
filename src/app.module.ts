import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialportModule } from './serialport/serialport.module';
import { SmsModule } from './sms/sms.module';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { Queue } from 'bull';

@Module({
  imports: [SerialportModule, SmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
