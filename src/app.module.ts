import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app/config.module';
import { MailModule } from '@mail/mail.module';

@Module({
  imports: [AppConfigModule, MailModule],
})
export class AppModule {}
