import { IsNotEmpty } from 'class-validator';

export class CreateLetterDto {
  @IsNotEmpty()
  letterContent: string;
}
