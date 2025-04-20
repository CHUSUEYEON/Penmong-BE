import { Module } from '@nestjs/common';
import { LettersModule } from './letter/letter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 환경 변수 접근 가능
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    LettersModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
