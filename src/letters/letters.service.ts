import { Injectable } from '@nestjs/common';
import { Letter, letterScope } from './letters.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class LettersService {
  private letters: Letter[] = [];

  getAllLetters(): Letter[] {
    return this.letters;
  }

  createLetter(letterContent: string): Letter {
    const letter: Letter = {
      letterIdx: uuid(), // 실제론 DB에서 생성되거나 UUID 등으로 대체
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
}
