import { Injectable, NotFoundException } from '@nestjs/common';
// import { v1 as uuid } from 'uuid';
import { CreateLetterDto } from './dto/create-letter.dto';
import { throws } from 'assert';
import { LetterRepository } from './letters.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Letter } from './letters.entity';

@Injectable()
export class LettersService {
  //  의존성 주입(생성자 방법)
  constructor(private readonly letterRepository: LetterRepository) {}

  // 상세 게시물 조회
  async getLetterById(letterId: number): Promise<Letter> {
    const found = await this.letterRepository.getLetterById(letterId);

    if (!found || found.letterDeletedAt !== null)
      throw new NotFoundException(`Can't find letter wieh id ${letterId}`);
    return found;
  }

  // 전체 게시물 조회
  getAllLetters(): Promise<Letter[]> {
    return this.letterRepository.getAllLetters();
  }

  // 게시물 생성
  createLetter(createLetterDto: CreateLetterDto): Promise<Letter> {
    return this.letterRepository.createLetter(createLetterDto);
  }

  // 게시물 삭제
  async deleteLetter(letterId: number): Promise<void> {
    const letter = await this.letterRepository.getLetterById(letterId); // 해당 게시물 찾기

    if (!letter || letter.letterDeletedAt !== null) {
      throw new NotFoundException(`Can't find letter with id ${letterId}`);
    }

    await this.letterRepository.deleteLetter(letter);
  }
}
