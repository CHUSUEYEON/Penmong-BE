import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from 'src/auth/dto/authCredentials.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import * as brcypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // 로그인
  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userId, userPassword } = authCredentialsDto;
    const user = await this.userRepository.findByUserId(userId);
    const isCorrect = await brcypt.compare(userPassword, user.userPassword);

    if (!user) throw new UnauthorizedException('존재하지 않는 아이디입니다.');
    if (!isCorrect) throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    try {
      const payload = { userId };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      console.log(error);
    }
  }
}
