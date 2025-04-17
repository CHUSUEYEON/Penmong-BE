import { Module } from '@nestjs/common';
import { LettersController } from './letters.controller';
import { LettersService } from './letters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterRepository } from './letters.repository';
import { Letter } from './letters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Letter])],
  controllers: [LettersController],
  providers: [LetterRepository, LettersService],
})
export class LettersModule {}
