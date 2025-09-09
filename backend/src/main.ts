import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let app;

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.enableCors({
    origin: true,
    credentials: true,
  });
  nestApp.useGlobalPipes(new ValidationPipe());
  
  const port = process.env.PORT || 3000;
  await nestApp.listen(port);
  console.log(`Application is running on: ${await nestApp.getUrl()}`);
  return nestApp;
}

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

// For Vercel serverless
export default async (req, res) => {
  const app = await createApp();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
