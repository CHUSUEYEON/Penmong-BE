import { Controller, Get } from '@nestjs/common';
import { LettersService } from './letters.service';

@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @Get()
  getAllLetters() {
    console.log(this.lettersService.getAllLetters());
    return this.lettersService.getAllLetters();
  }
}
