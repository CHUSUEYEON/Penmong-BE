import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new swaggerConfig().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document); // 스웨거 페이지 경로 설정

  app.use(cookieParser()); // 쿠키 미들웨어 설정

  app.enableCors({
    //cors 설정
    origin: true,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
