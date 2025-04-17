import { Module } from '@nestjs/common';
import { LettersModule } from './letters/letters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), LettersModule],
})
export class AppModule {}
