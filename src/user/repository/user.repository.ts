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

  async findByUserId(userId: string): Promise<User> {
    return this.userRepo.findOneBy({ userId });
  }

  async existsByUserNickname(userNickname: string): Promise<boolean> {
    return this.userRepo.existsBy({ userNickname });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepo.create(user);

    await this.userRepo.save(newUser);

    return newUser;
  }
}
