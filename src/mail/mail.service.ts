import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailConfigService } from '@config/mail/config.service';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailerService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly mailConfigService: MailConfigService,
  ) {}

  async sendRegisterNotify(
    email: string,
    userId: number,
    displayName: string,
    confirmCode: string,
  ): Promise<[boolean, string]> {
    try {
      const { messageId } = await this.mailerService.sendMail({
        from: this.mailConfigService.registerFrom,
        to: email,
        subject: this.mailConfigService.registerSubject,
        template: 'register',
        context: {
          user_id: userId,
          name: displayName,
          confirm_code: confirmCode,
        },
      });

      return [true, messageId];
    } catch (error) {
      this.logger.error(error);

      return [false, ''];
    }
  }
}
