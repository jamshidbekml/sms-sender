import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SerialPortService } from 'src/serialport/serialport.service';

@Injectable()
export class SmsService {
  constructor(
    @InjectQueue('sms') private readonly smsQueue: Queue,
    private readonly serialPortService: SerialPortService,
  ) {}

  async queueSms(phoneNumber: string, message: string) {
    await this.smsQueue.add({ phoneNumber, message });
    return { message: 'SMS request added to queue.', success: true };
  }

  async sendSms({
    phoneNumber,
    message,
  }: {
    phoneNumber: string;
    message: string;
  }) {
    const port = this.getPort();
    const commands = [
      'AT+CMGF=1\r',
      `AT+CMGS="${phoneNumber}"\r`,
      `${message}\x1A`,
    ];

    for (const [index, command] of commands.entries()) {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          port.write(command, (err) => {
            if (err) {
              reject(new Error(err.message));
            } else {
              resolve();
            }
          });
        }, index * 300);
      });
    }

    return { message: `Xabar muvaffaqqiyatli yuborildi!`, success: true };
  }

  getPort() {
    // Implement the logic to return the current active serial port
    return this.serialPortService.getPort();
  }
}
