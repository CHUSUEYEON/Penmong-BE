import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/authCredentials.dto';
import { AuthService } from '../service/auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인 API입니다.',
  })
  @ApiBody({
    description: '로그인 시 필요한 데이터',
    type: AuthCredentialsDto,
  })
  @Post('/login')
  async signin(
    @Res({ passthrough: true }) res: Response,
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } =
      await this.authService.signin(authCredentialsDto);

    // 쿠키 세팅(HTTP 세부 조작)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // 테스트 할 때 false로 바꾸기
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.refresh(
      req.cookies.refreshToken,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // 테스트 할 때 false로 바꾸기
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }
}
