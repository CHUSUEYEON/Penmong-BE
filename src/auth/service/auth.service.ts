import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup(dto: { userId: string; password: string; nickname: string }) {
    // 임시 반환값(테스트 통과용)
    return {
      userId: dto.userId,
      nickname: dto.nickname,
    };
  }

  async signin(dto: { userId: string; password: string }) {
    return {
      userId: dto.userId,
    };
  }
}
