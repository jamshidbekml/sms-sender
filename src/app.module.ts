import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialportModule } from './serialport/serialport.module';

@Module({
  imports: [SerialportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
