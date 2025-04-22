import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // 유저 조회

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userId, userNickname, userPassword, userPwQuestion, userPwAnswer } =
      createUserDto;

    if (await this.userRepo.existsBy({ userId: createUserDto.userId }))
      throw new ConflictException('이미 존재하는 아이디입니다.');

    if (
      await this.userRepo.existsBy({ userNickname: createUserDto.userNickname })
    )
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    try {
      const user = this.userRepo.create({
        userId,
        userNickname,
        userPassword,
        userPwQuestion,
        userPwAnswer,
      });

      await this.userRepo.save(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
