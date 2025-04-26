import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/authCredentials.dto';
import { AuthService } from '../service/auth.service';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
      secure: false, // 테스트 할 때 false로 바꾸기
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @ApiOperation({
    summary: 'accessToken 만료 시 토큰을 재발급하는 API입니다.',
  })
  @ApiHeader({
    name: 'Cookie',
    description:
      'refreshToken=토큰값 형식으로 쿠키를 보내야 합니다. 단, 스웨거에서는 refreshToken을 확인하기 어려워 포스트맨 등을 활용해서 수동으로 확인해야 합니다.',
    required: true,
  })
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
      secure: false, // 테스트 할 때 false로 바꾸기
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }
}
