import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:letterId')
  getByLetterId(@Param('letterId') letterId: string): Letter {
    return this.lettersService.getLetterById(letterId);
  }

  @Post()
  createLetter(@Body() createLetterDto: CreateLetterDto): Letter {
    console.log(createLetterDto);
    return this.lettersService.createLetter(createLetterDto);
  }

  @Delete('/:letterId')
  deleteLetter(@Param('letterId') letterId: string): void {
    this.lettersService.deleteLetter(letterId);
  }
}
