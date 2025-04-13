import { Body, Controller, Get, Post } from '@nestjs/common';
import { LettersService } from './letters.service';
import { Letter } from './letters.model';
import { CreateLetterDto } from './dto/create-letter.dto';

@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @Get()
  getAllLetters(): Letter[] {
    console.log(this.lettersService.getAllLetters());
    return this.lettersService.getAllLetters();
  }

  @Post()
  createLetter(@Body() createLetterDto: CreateLetterDto): Letter {
    console.log(createLetterDto);
    return this.lettersService.createLetter(createLetterDto);
  }
}
