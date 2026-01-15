import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { IsString } from 'class-validator';
import { Response } from 'express';
import { cookieNames } from '@/domain/config';
import { DbService } from '@/services/db.service';
import { JwtService } from '@/services/jwt.service';
import { PasswordService } from '@/services/password.service';

class UserCredentialsDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}


@Controller('public/auth/session')
export class AuthController {
  constructor(
    private readonly dbService: DbService, 
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

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
  async create(@Res({ passthrough: true }) res: Response, @Body() body: UserCredentialsDto) {

    const { email, password } = body;
    const user = await this.dbService.users.getForLogin({ email });
    if (!user) {
        res.status(HttpStatus.UNAUTHORIZED);
        return;
    }

    const passwordIsCorrect = await this.passwordService.verifyPassword(password, user.passwordHash);
  if (!passwordIsCorrect) {
    res.status(HttpStatus.UNAUTHORIZED);
    return;
  }

  const token = this.jwtService.generateToken({ id: user.id, purpose: 'session' });

    res.cookie(cookieNames.token, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: this.jwtService.getTokenExpirySeconds(),
  });
    return {};
  }
}
