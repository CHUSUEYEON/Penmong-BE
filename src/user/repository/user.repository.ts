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

  async existsByUserId(userId: string): Promise<boolean> {
    return this.userRepo.existsBy({ userId });
  }

  async existsByUserNickname(userNickname: string): Promise<boolean> {
    return this.userRepo.existsBy({ userNickname });
  }

  // 유저 조회

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepo.create(user);

    await this.userRepo.save(newUser);

    return newUser;
  }
}
