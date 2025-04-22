import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { LetterScope } from '../model/letter-scope.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLetterDto {
  @ApiProperty({
    example: '오늘 날씨 좋네요.',
    description: '사용자들이 편지에 작성하는 내용입니다.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  letterContent: string;

  @ApiProperty({
    example: '1',
    description: '1~4까지 4가지 색상 중 하나를 골라 편지에 적용할 수 있습니다.',
  })
  @IsNotEmpty()
  @Min(1)
  @Max(4) // 1~4중 하나 선택
  @IsInt()
  letterColor: number;

  @ApiProperty({
    example: '3',
    description: '1~3까지 3가지 모양 중 하나를 골라 편지에 적용할 수 있습니다.',
  })
  @IsNotEmpty()
  @Min(1)
  @Max(3) // 1~3중 하나 선택
  @IsInt()
  letterShape: number;

  @ApiProperty({
    example: 'image.png',
    description: '편지에 함께 업로드되는 사진입니다.',
  })
  @IsOptional()
  @IsString()
  letterFile?: string; //Todo : 파일 저장 어떻게 할지 고민해야 함.(경로 저장, 이름 저장 등등)

  @ApiProperty({
    example: 'PUBLIC',
    description: '전체 공개인지, 방에서 공개인지 선택하는 부분입니다.',
    enum: ['PUBLIC', 'ROOM'],
  })
  @IsNotEmpty()
  @IsEnum(LetterScope)
  letterScope: LetterScope;

  @ApiProperty({
    example: 'true',
    description:
      '전체 공개가 아닐 경우 특정인에게만 보입니다. - 연결된 외래키 이용(특정인) ',
  })
  @IsBoolean()
  letterIsPublic: boolean;
}
