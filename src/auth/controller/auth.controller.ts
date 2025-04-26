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
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
      secure: true, // 테스트 할 때 false로 바꾸기
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @ApiOperation({
    summary: '로그아웃 하는 API입니다.',
  })
  @ApiHeader({
    name: 'Cookie',
    description:
      'refreshToken=토큰값 형식으로 쿠키를 보내야 합니다. 단, 스웨거에서는 refreshToken을 확인하기 어려워 포스트맨 등을 활용해서 수동으로 확인해야 합니다.',
    required: true,
  })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.cookies.refreshToken);

    // 쿠키 삭제
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true, // 테스트 할 때 false로 바꾸기
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 0, //삭제
    });

    return { message: '로그아웃 되었습니다.' };
  }
}
