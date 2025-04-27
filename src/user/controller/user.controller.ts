import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '회원가입 API입니다.',
  })
  @ApiBody({
    description: '회원가입 시 필요한 데이터',
    type: CreateUserDto,
  })
  @Post()
  async signup(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<CommonResponseDto<User>> {
    const user = await this.userService.signup(createUserDto);
    return new CommonResponseDto(true, '회원가입 성공', user);
  }

  // @UseGuards(AuthGuard())
  // @Post('/test')
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
