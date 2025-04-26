import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signup(createUserDto);
  }

  // @UseGuards(AuthGuard())
  // @Post('/test')
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
