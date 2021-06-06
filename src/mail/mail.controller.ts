import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  SendRegisterNotifyRequest,
  SendRegisterNotifyResponse,
} from 'cryptomath-api-message-types';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('send-register-notify')
  async sendRegisterNotify(
    @Payload()
    { email, userId, displayName, confirmCode }: SendRegisterNotifyRequest,
  ): Promise<SendRegisterNotifyResponse> {
    const [isMailSent, messageId] = await this.mailService.sendRegisterNotify(
      email,
      userId,
      displayName,
      confirmCode,
    );

    return { isMailSent, messageId };
  }
}
