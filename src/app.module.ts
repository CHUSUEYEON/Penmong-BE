import { Module } from '@nestjs/common';
import { LettersModule } from './letters/letters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 환경 변수 접근 가능
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    LettersModule,
  ],
})
export class AppModule {}
