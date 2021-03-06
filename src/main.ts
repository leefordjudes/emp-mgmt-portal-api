import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor());
  const server = await app.listen(3000);
  // 600,000=> 10Min, 1200,000=>20Min, 1800,000=>30Min
  server.setTimeout(1800000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
