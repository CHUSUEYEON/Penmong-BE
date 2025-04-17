import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  isString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { LetterScope } from '../letter-scope.enum';

export class CreateLetterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  letterContent: string;

  @IsNotEmpty()
  @Min(1)
  @Max(4) // 1~4중 하나 선택
  @IsInt()
  letterColor: number;

  @IsNotEmpty()
  @Min(1)
  @Max(3) // 1~3중 하나 선택
  @IsInt()
  letterShape: number;

  @IsOptional()
  @IsString()
  letterFile?: string;

  @IsBoolean() // IsNotEmpty는 false일 때 유효하지 않다고 판단할 수 있음.
  letterIsReported: boolean;

  @IsNotEmpty()
  @IsEnum(LetterScope)
  letterScope: LetterScope;

  @IsBoolean()
  letterIsPublic: boolean; // 전체 공개 기본
}
