import { EntityRepository, Repository } from 'typeorm';
import { Letter } from '../model/letter.entity';
import { CreateLetterDto } from '../dto/create-letter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LetterRepository {
  //  의존성 주입(생성자 방법)
  constructor(
    @InjectRepository(Letter)
    private readonly letterRepo: Repository<Letter>,
  ) {}

  // 상세 게시물 조회
  async getLetterById(letterId: number): Promise<Letter> {
    const found = await this.letterRepo.findOne({
      where: { letterId },
    });

    return found;
  }

  // 전체 게시물 조회
  async getAllLetters(): Promise<Letter[]> {
    // const found = await this.letterRepo.find({
    //   where: { letterDeletedAt: null },
    // });

    // return found;
    const letters = await this.letterRepo
      .createQueryBuilder('letter')
      .where('letter.letterDeletedAt IS NULL')
      .getMany();

    return letters;
  }

  // 게시물 생성
  async createLetter(createLetterDto: CreateLetterDto): Promise<Letter> {
    const {
      letterContent,
      letterColor,
      letterShape,
      letterFile,
      letterScope,
      letterIsPublic,
    } = createLetterDto;

    const letter = this.letterRepo.create({
      letterContent,
      letterColor,
      letterShape,
      letterFile,
      letterIsReported: false, // 기본값 신고 X
      letterScope,
      letterIsPublic,
    });
    await this.letterRepo.save(letter);

    return letter;
  }

  async deleteLetter(letter: Letter): Promise<void> {
    // 논리삭제 : null -> 삭제날짜로 변경
    letter.letterDeletedAt = new Date();
    await this.letterRepo.save(letter);
  }
}
