/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
