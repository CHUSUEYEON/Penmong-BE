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
import { CommonResponseDto } from 'src/common/dto/common-response.dto';

@ApiTags('Letter') // 스웨거에 태그 생성
@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @ApiOperation({
    summary: '전체 편지를 조회하는 API입니다.',
  })
  @Get()
  async getAllLetters(): Promise<CommonResponseDto<Letter[]>> {
    const letters = await this.lettersService.getAllLetters();
    return new CommonResponseDto(true, '전체 편지 조회 성공', letters);
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
  async getByLetterId(
    @Param('letterId', ParseIntPipe) letterId: number,
  ): Promise<CommonResponseDto<Letter>> {
    const letter = await this.lettersService.getLetterById(letterId);
    return new CommonResponseDto(true, '상세 편지 조회 성공', letter);
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
  async createLetter(
    @Body() createLetterDto: CreateLetterDto,
  ): Promise<CommonResponseDto<Letter>> {
    console.log(createLetterDto);
    const newLetter = await this.lettersService.createLetter(createLetterDto);
    return new CommonResponseDto(true, '편지 생성 성공', newLetter);
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
  ): Promise<CommonResponseDto<null>> {
    await this.lettersService.deleteLetter(letterId);

    return new CommonResponseDto(true, '편지 삭제 성공', null);
  }
}
