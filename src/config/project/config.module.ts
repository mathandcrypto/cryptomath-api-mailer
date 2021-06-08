import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ProjectConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        PROJECT_URL: Joi.string(),
        REGISTER_CONFIRM_LINK: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, ProjectConfigService],
  exports: [ConfigService, ProjectConfigService],
})
export class ProjectConfigModule {}
