import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  // 각 테스트 실행 전에 실행되는 비동기 함수
  // 테스트 환경(Module)을 구성하고 컴파일 함.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    // 의존성 주입으로 service 변수에 할당
    service = module.get<AuthService>(AuthService);
  });

  // 회원가입 테스트
  it('회원가입이 성공하면 회원 정보를 반환한다.', async () => {
    // 준비: 가짜 DTO (회원가입에 필요한 데이터)
    const dto = {
      userId: 'testuser',
      password: '1234',
      nickname: 'test',
    };

    // 행동: 회원가입 시도
    const result = await service.signup(dto);

    // 검증 : 반환된 객체 안에 user가 있어야 함.
    expect(result.userId).toBe(dto.userId);
  });

  // 로그인 테스트
  it('로그인이 성공하면 회원 정보를 반환한다.', async () => {
    const dto = {
      userId: 'testuser',
      password: '1234',
    };

    const result = await service.signin(dto);

    expect(result.userId).toBe(dto.userId);
  });
});
