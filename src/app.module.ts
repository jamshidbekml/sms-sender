import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialportModule } from './serialport/serialport.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [SerialportModule, SmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
