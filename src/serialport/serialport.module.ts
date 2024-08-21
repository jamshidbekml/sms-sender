import { Module } from '@nestjs/common';
import { SerialPortService } from './serialport.service';

@Module({
  providers: [SerialPortService],
  exports: [SerialPortService],
})
export class SerialportModule {}
