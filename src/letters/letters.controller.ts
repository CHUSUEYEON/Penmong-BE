import { Body, Controller, Get, Post } from '@nestjs/common';
import { LettersService } from './letters.service';
import { Letter } from './letters.model';

@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @Get()
  getAllLetters(): Letter[] {
    console.log(this.lettersService.getAllLetters());
    return this.lettersService.getAllLetters();
  }

  @Post()
  createLetter(@Body('letterContent') letterContent: string): Letter {
    console.log(letterContent);
    return this.lettersService.createLetter(letterContent);
  }
}
