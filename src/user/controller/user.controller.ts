import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthCredentialsDto } from '../dto/authCredentials.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signup(createUserDto);
  }

  @Post('/login')
  signin(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signin(authCredentialsDto);
  }
}
