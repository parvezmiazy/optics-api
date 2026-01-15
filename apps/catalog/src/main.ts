import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CatalogModule } from './catalog.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'Catalog Service';
  const logger = new Logger('CatalogBootstrap');


    const rmqUrl = process.env.RABBITMQ_URL ?? "amqp://localhost:5672";
    const queue = process.env.CATALOG_QUEUE ?? "catalog_queue";

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(CatalogModule, {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: true,
       
        },
      
      },
    });

    app.enableShutdownHooks();
    await app.listen();
    logger.log(`Catalog Service listening on queue: ${queue} via ${rmqUrl}`);
  
   
  
    
  
}

bootstrap();
