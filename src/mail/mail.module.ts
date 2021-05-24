import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigModule } from '@config/mail/config.module';
import { MailConfigService } from '@config/mail/config.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [MailConfigModule],
      inject: [MailConfigService],
      useFactory: (mailConfigService: MailConfigService) => {
        const { host, port, secure, username, password } = mailConfigService;

        return {
          transport: {
            host,
            port,
            secure,
            auth: {
              user: username,
              pass: password,
            },
          },
          template: {
            dir: join(process.cwd(), 'src/templates/'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    MailConfigModule,
  ],
  providers: [MailConfigService, MailService],
  controllers: [MailController],
})
export class MailModule {}
