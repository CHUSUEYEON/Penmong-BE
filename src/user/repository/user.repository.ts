import { Injectable } from '@nestjs/common';
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userId, userNickname, userPassword, userPwQuestion, userPwAnswer } =
      createUserDto;

    const user = this.userRepo.create({
      userId,
      userNickname,
      userPassword,
      userPwQuestion,
      userPwAnswer,
    });

    await this.userRepo.save(user);

    return user;
  }
}
