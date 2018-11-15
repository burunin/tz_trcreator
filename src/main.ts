import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BtcModule } from './btc.module';

async function bootstrap() {
  const app = await NestFactory.create(BtcModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
