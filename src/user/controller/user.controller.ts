import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return this.userService.signup(createUserDto);
  }
}
