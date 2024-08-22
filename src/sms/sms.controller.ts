import { Controller, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async sendSms(@Body() body: { phoneNumber: string; message: string }) {
    return this.smsService.queueSms(body.phoneNumber, body.message);
  }
}
