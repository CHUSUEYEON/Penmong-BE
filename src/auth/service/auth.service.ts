import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
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
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { userId, userPassword } = authCredentialsDto;
    const user = await this.userRepository.findByUserId(userId);
    if (!user) throw new UnauthorizedException('존재하지 않는 아이디입니다.');

    const isCorrect = await brcypt.compare(userPassword, user.userPassword);
    if (!isCorrect) throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    try {
      const payload = { userId };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      user.userRefreshToken = refreshToken;
      await this.userRepository.saveRefreshToken(user);

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('로그인 중 문제가 발생했습니다.');
    }
  }

  // refreshToken 갱신
  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userRepository.findByUserId(payload.userId);
      if (!user || user.userRefreshToken !== refreshToken)
        throw new UnauthorizedException('유효한 인증이 아닙니다.');

      const newAccessToken = this.jwtService.sign({ userId: user.userId });
      const newRefreshToken = this.jwtService.sign(
        { userId: user.userId },
        { expiresIn: '7d' },
      );

      user.userRefreshToken = newRefreshToken;
      await this.userRepository.saveRefreshToken(user);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '토큰 갱신 중 문제가 발생했습니다.',
      );
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      if (!refreshToken)
        throw new UnauthorizedException('리프레쉬 토큰이 없습니다.');

      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userRepository.findByUserId(payload.userId);

      if (!user) throw new UnauthorizedException('유저를 찾을 수 없습니다.');

      // 리프레쉬 토큰 초기화
      user.userRefreshToken = null;
      await this.userRepository.saveRefreshToken(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '로그아웃 중 문제가 발생했습니다.',
      );
    }
  }
}
