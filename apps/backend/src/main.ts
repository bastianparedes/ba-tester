import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { RedisIoAdapter } from './adapters/redis-socket-io';
import { AppModule } from './app.module';
import { env } from './libs/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const redisAdapter = new RedisIoAdapter(app);
  await redisAdapter.connectToRedis();
  app.useWebSocketAdapter(redisAdapter);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(env.PORT);
}
bootstrap();
