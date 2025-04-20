import { Module } from '@nestjs/common';
import { LettersController } from './controller/letters.controller';
import { LettersService } from './service/letters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterRepository } from './repository/letters.repository';
import { Letter } from './model/letters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Letter])],
  controllers: [LettersController],
  providers: [LetterRepository, LettersService, LetterRepository],
})
export class LettersModule {}
