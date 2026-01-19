import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SearchModule } from './search.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'Search Service';
  const logger = new Logger('Search Bootstrap');
 const rmqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';

  const queue = process.env.SEARCH_QUEUE ?? 'search_queue';
  // create microservice instance

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
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
  logger.log(`Search RMQ  listening on port ${queue} via ${rmqUrl}`);
}
bootstrap();
