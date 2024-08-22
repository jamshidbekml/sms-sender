import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SmsService } from './sms.service';

@Processor('sms')
export class SmsProcessor {
  constructor(private readonly smsService: SmsService) {}

  @Process()
  async handleSmsJob(job: Job<{ phoneNumber: string; message: string }>) {
    const { phoneNumber, message } = job.data;
    await this.smsService.sendSms({ phoneNumber, message });
  }
}
