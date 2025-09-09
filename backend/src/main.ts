import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let app;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: true,
      credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }
  return app;
}

export default async (req, res) => {
  const app = await createApp();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
};
