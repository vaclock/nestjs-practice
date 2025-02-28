import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 添加全局日志中间件
  app.use((req, res, next) => {
    Logger.log(`${req.method} ${req.url}`, 'Request');
    next();
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
