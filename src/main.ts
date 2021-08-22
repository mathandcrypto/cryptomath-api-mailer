import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from '@config/app/config.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const appConfigService = app.get(AppConfigService);

  const { rmqUrl, rmqQueueName } = appConfigService;

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: rmqQueueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.init();

  app.startAllMicroservices(() =>
    logger.log(`Mailer microservice is listening on ${rmqUrl}`),
  );
}
bootstrap();
