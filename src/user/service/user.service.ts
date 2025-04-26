import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../model/user.entity';
import * as brcypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { AuthCredentialsDto } from '../dto/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { userId, userNickname, userPassword, userPwQuestion, userPwAnswer } =
      createUserDto;

    if (await this.userRepository.existsByUserId(userId))
      throw new ConflictException('이미 존재하는 아이디입니다.');

    if (await this.userRepository.existsByUserNickname(userNickname))
      throw new ConflictException('이미 존재하는 닉네임입니다.');

    try {
      const salt = await brcypt.genSalt();
      const hashPassword = await brcypt.hash(userPassword, salt);

      const user = this.userRepository.createUser({
        userId,
        userNickname,
        userPassword: hashPassword,
        userPwQuestion,
        userPwAnswer,
      });

      return plainToInstance(User, user, {
        excludeExtraneousValues: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userId, userPassword } = authCredentialsDto;
    const user = await this.userRepository.existsByUserId(userId);

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 아이디입니다.');
    }

    try {
      if (user && (await brcypt.compare(userPassword, user.userPassword))) {
        const payload = { userId };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
      } else throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    } catch (error) {
      console.log(error);
    }
  }
}
