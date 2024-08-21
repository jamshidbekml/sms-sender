import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-sms')
  getHello(@Body() body: { phoneNumber: string; message: string }) {
    return this.appService.sendSms(body);
  }
}
