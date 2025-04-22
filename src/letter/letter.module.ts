import { Module } from '@nestjs/common';
import { LettersController } from './controller/letter.controller';
import { LettersService } from './service/letter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterRepository } from './repository/letter.repository';
import { Letter } from './model/letter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Letter])],
  controllers: [LettersController],
  providers: [LetterRepository, LettersService],
})
export class LettersModule {}
