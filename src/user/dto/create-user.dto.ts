import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'penmong',
    description: '회원 아이디입니다.',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  @Matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{4,16}$/, {
    message:
      '아이디는 대소문자, 숫자로 구성되며, 4자 이상 16자 이하이어야 합니다.',
  })
  userId: string;

  @ApiProperty({
    example: '펜몽',
    description: '회원 닉네임입니다.',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/, {
    message:
      '닉네임은 대소문자, 숫자, 한글(초성x)로 구성되며, 2자 이상 16자 이하이어야 합니다.',
  })
  userNickname: string;

  @ApiProperty({
    example: 'Pen123!!',
    description: '회원 비밀번호입니다.',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, {
    message:
      '비밀번호는 최소 8자 및 최대 20자이며, 특수문자, 문자, 숫자를 포함해야 합니다.',
  }) // 최소 8자 및 최대 20자, 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
  // https://beagle-dev.tistory.com/114
  userPassword: string;

  @ApiProperty({
    example: '당신의 보물 1호는?',
    description: '비밀번호 찾을 때 사용할 질문입니다.',
  })
  @IsString()
  userPwQuestion: string;

  @ApiProperty({
    example: '펜몽',
    description: '비밀번호 찾을 때 사용할 답변입니다.',
  })
  @IsString()
  userPwAnswer: string;
}
