import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }

  get port(): number {
    return this.configService.get<number>('mail.port');
  }

  get secure(): boolean {
    return this.configService.get<boolean>('mail.secure');
  }

  get username(): string {
    return this.configService.get<string>('mail.username');
  }

  get password(): string {
    return this.configService.get<string>('mail.password');
  }

  get registerFrom(): string {
    return this.configService.get<string>('mail.registerFrom');
  }

  get registerSubject(): string {
    return this.configService.get<string>('mail.registerSubject');
  }
}
