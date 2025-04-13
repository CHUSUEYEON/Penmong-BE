import { Injectable } from '@nestjs/common';

@Injectable()
export class LettersService {
  private letters = [];

  getAllLetters() {
    return this.letters;
  }
}
