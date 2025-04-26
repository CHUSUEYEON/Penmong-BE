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
import { LettersService } from '../service/letter.service';
import { CreateLetterDto } from '../dto/create-letter.dto';
import { Letter } from '../model/letter.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Letter') // 스웨거에 태그 생성
@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @ApiOperation({
    summary: '전체 편지를 조회하는 API입니다.',
  })
  @Get()
  getAllLetters(): Promise<Letter[]> {
    console.log(this.lettersService.getAllLetters());
    return this.lettersService.getAllLetters();
  }

  @ApiOperation({
    summary: '상세 편지 하나를 조회하는 API입니다.',
  })
  @ApiParam({
    name: 'letterId',
    type: 'number',
    description: '조회할 편지의 id 입력',
  })
  @Get('/:letterId')
  getByLetterId(
    @Param('letterId', ParseIntPipe) letterId: number,
  ): Promise<Letter> {
    return this.lettersService.getLetterById(letterId);
  }

  @ApiOperation({
    summary: '편지를 생성하는 API입니다.',
  })
  @ApiBody({
    description: '편지 생성 시 필요한 데이터',
    type: CreateLetterDto,
  })
  @Post()
  @UsePipes(ValidationPipe)
  createLetter(@Body() createLetterDto: CreateLetterDto): Promise<Letter> {
    console.log(createLetterDto);
    return this.lettersService.createLetter(createLetterDto);
  }

  @ApiOperation({
    summary: '편지를 삭제하는 API입니다.',
  })
  @ApiParam({
    name: 'letterId',
    type: 'number',
    description: '삭제할 편지의 id 입력',
  })
  @Delete('/:letterId')
  async deleteLetter(
    @Param('letterId', ParseIntPipe) letterId: number,
  ): Promise<void> {
    await this.lettersService.deleteLetter(letterId);
  }
}
