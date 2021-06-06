import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectConfigService {
  constructor(private configService: ConfigService) {}

  get url(): string {
    return this.configService.get<string>('project.url');
  }

  get registerConfirmLink(): string {
    return this.configService.get<string>('project.registerConfirmLink');
  }

  getRegisterConfirmUrl(userId: number, confirmCode: string) {
    return `${this.url}${this.registerConfirmLink
      .replace('{userId}', this.url)
      .replace('{confirmCode}', confirmCode)}`;
  }
}
