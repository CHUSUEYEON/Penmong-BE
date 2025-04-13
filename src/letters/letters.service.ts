import { Injectable } from '@nestjs/common';
import { Letter, letterScope } from './letters.model';
import { v1 as uuid } from 'uuid';
import { CreateLetterDto } from './dto/create-letter.dto';

@Injectable()
export class LettersService {
  private letters: Letter[] = [];

  getAllLetters(): Letter[] {
    return this.letters;
  }

  getLetterById(letterId: string): Letter {
    return this.letters.find((letter) => letter.letterId === letterId);
  }

  createLetter(createLetterDto: CreateLetterDto): Letter {
    const { letterContent } = createLetterDto; // 여러개면 옆에 , 쓰고 쭈욱 작성 ex) letterContent, letterColor, ...

    const letter: Letter = {
      letterId: uuid(), // 실제론 DB에서 생성되거나 UUID 등으로 대체
      letterContent,
      letterColor: 1,
      letterShape: 1, // 기본 값 설정
      letterFile: 0, // 파일 없음
      letterIsReported: false, // 기본값 신고 X
      letterScope: letterScope.GLOBAL, // 기본 공개범위
      letterIsPublic: true, // 전체 공개 기본
      letterCreatedAt: new Date().toISOString(),
      letterDeletedAt: null, // 아직 삭제 안 됨
    };

    this.letters.push(letter);
    return letter;
  }

  deleteLetter(letterId: string): void {
    this.letters = this.letters.filter(
      (letter) => letter.letterId !== letterId,
    );
  }
}
