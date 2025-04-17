import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LettersService } from './letters.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import { Letter } from './letters.entity';

@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @Get()
  getAllLetters(): Promise<Letter[]> {
    console.log(this.lettersService.getAllLetters());
    return this.lettersService.getAllLetters();
  }

  @Get('/:letterId')
  getByLetterId(
    @Param('letterId', ParseIntPipe) letterId: number,
  ): Promise<Letter> {
    return this.lettersService.getLetterById(letterId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createLetter(@Body() createLetterDto: CreateLetterDto): Promise<Letter> {
    console.log(createLetterDto);
    return this.lettersService.createLetter(createLetterDto);
  }

  @Delete('/:letterId')
  async deleteLetter(
    @Param('letterId', ParseIntPipe) letterId: number,
  ): Promise<void> {
    await this.lettersService.deleteLetter(letterId);
  }
}
