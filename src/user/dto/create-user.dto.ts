import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'penmong',
    description: '회원 아이디입니다.',
  })
  userId: string;

  @ApiProperty({
    example: '펜몽',
    description: '회원 닉네임입니다.',
  })
  userNickname: string;

  @ApiProperty({
    example: '1234',
    description: '회원 비밀번호입니다.',
  })
  userPassword: string;

  @ApiProperty({
    example: '당신의 보물 1호는?',
    description: '비밀번호 찾을 때 사용할 질문입니다.',
  })
  userPwQuestion: string;

  @ApiProperty({
    example: '펜몽',
    description: '비밀번호 찾을 때 사용할 답변입니다.',
  })
  userPwAnswer: string;
}
