import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { SmsService } from './sms.service';
import { Logger } from '@nestjs/common';

@Processor('sms')
export class SmsProcessor {
  private readonly logger = new Logger(SmsProcessor.name);
  constructor(private readonly smsService: SmsService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} with data ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.log(`Completed job ${job.id} with result: ${result}`);
  }

  @OnQueueFailed()
  onFailed(job: Job, error: any) {
    this.logger.error(`Failed job ${job.id} with error: ${error.message}`);
  }

  @Process()
  async handleSmsJob(job: Job<{ phoneNumber: string; message: string }>) {
    const { phoneNumber, message } = job.data;
    const data = await this.smsService.sendSms({ phoneNumber, message });
    console.log(phoneNumber, data);
  }
}
