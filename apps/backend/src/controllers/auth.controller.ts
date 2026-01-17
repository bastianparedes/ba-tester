import { Body, Controller, Get, Post, Res, UnauthorizedException } from '@nestjs/common';
import { IsString } from 'class-validator';
import { type Response } from 'express';
import { cookieNames } from '@/domain/config';
import { generateToken, secondsTokenIsValid } from '@/libs/auth/jwt';
import { isPasswordCorrect } from '@/libs/auth/password';
import { DbService } from '@/services/db.service';

class UserCredentialsDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

@Controller('public/auth/session')
export class AuthController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  async logOut(@Res({ passthrough: true }) res: Response) {
    res.cookie(cookieNames.token, '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: -1,
    });

    return {};
  }

  @Post()
  async logIn(@Res({ passthrough: true }) res: Response, @Body() body: UserCredentialsDto) {
    const { email, password } = body;
    const user = await this.dbService.users.getForLogin({ email });
    if (!user) throw new UnauthorizedException();

    const passwordIsCorrect = isPasswordCorrect({ password, passwordHash: user.passwordHash });
    if (!passwordIsCorrect) throw new UnauthorizedException();

    const token = generateToken({ id: user.id, purpose: 'session' });

    res.cookie(cookieNames.token, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: secondsTokenIsValid,
    });
    return {};
  }
}
