import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SerialPortService } from './serialport/serialport.service';

@Injectable()
export class AppService {
  constructor(private readonly serialPortService: SerialPortService) {}

  sendSms({ phoneNumber, message }: { phoneNumber: string; message: string }) {
    const port = this.serialPortService.getPort();
    const commands = [
      'AT+CMGF=1\r',
      `AT+CMGS="${phoneNumber}"\r`,
      `${message}\x1A`,
    ];

    commands.forEach((command, index) => {
      setTimeout(() => {
        port.write(command, (err) => {
          if (err) {
            throw new InternalServerErrorException(err.message);
          }
        });
      }, index * 100);
    });

    return { message: `Xabar muvaffaqqiyatli yuborildi!`, success: true };
  }
}
