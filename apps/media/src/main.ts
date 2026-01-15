import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { MediaModule } from './media.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'Media Service';
  const logger = new Logger('MediaBootstrap');
  const port = Number(process.env.MEDIA_TCP_PORT ?? 4011);
  const rmqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';

  const queue = process.env.MEDIA_QUEUE ?? 'media_queue';
  // create microservice instance

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
    {
       transport: Transport.RMQ,
  options: {
    urls: [rmqUrl],
    queue,
    queueOptions: {
      durable: false
    },
  },
    },
  );
  app.enableShutdownHooks();
  await app.listen();
  logger.log(`Media RMQ  listening on port ${queue} via ${rmqUrl}`);
}
bootstrap();
