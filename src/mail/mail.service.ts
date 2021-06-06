import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailConfigService } from '@config/mail/config.service';
import { ProjectConfigService } from '@config/project/config.service';
import { getCurrentYear } from '@common/helpers/date.helper';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailerService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly mailConfigService: MailConfigService,
    private readonly projectConfigService: ProjectConfigService,
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
          project_link: this.projectConfigService.url,
          name: displayName,
          confirm_link: this.projectConfigService.getRegisterConfirmUrl(
            userId,
            confirmCode,
          ),
          year: getCurrentYear(),
        },
      });

      return [true, messageId];
    } catch (error) {
      this.logger.error(error);

      return [false, ''];
    }
  }
}
