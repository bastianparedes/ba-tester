import { Body, Controller, Get, Post, Res, UnauthorizedException } from '@nestjs/common';
import { type Response } from 'express';
import { z } from 'zod';
import { TypeApiSessions } from '../../../domain/api/sessions';
import { cookieNames } from '../../../domain/config';
import { type AssertEqual } from '../../../domain/types/utils';
import { generateToken, secondsTokenIsValid } from '../libs/auth/jwt';
import { isPasswordCorrect } from '../libs/auth/password';
import { env } from '../libs/env';
import { ZodValidationPipe } from '../pipes/zod';
import { DbService } from '../services/db.service';

const logInSchema = z
  .object({
    email: z.email(),
    password: z.string(),
  })
  .strip();

@Controller('public/auth/session')
export class AuthController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  async logOut(@Res({ passthrough: true }) res: Response): Promise<TypeApiSessions['logOut']['response']> {
    res.clearCookie(cookieNames.token, {
      domain: env.DOMAIN,
      httpOnly: true,
      maxAge: -1,
      path: '/',
      sameSite: 'none',
      secure: true,
    });

    return {};
  }

  @Post()
  async logIn(
    @Res({ passthrough: true }) res: Response,
    @Body(new ZodValidationPipe(logInSchema)) body: AssertEqual<z.infer<typeof logInSchema>, TypeApiSessions['logIn']['request']['body']>,
  ): Promise<TypeApiSessions['logIn']['response']> {
    const { email, password } = body;
    const user = await this.dbService.users.getForLogin({ email });
    if (!user) throw new UnauthorizedException();

    const passwordIsCorrect = isPasswordCorrect({ password, passwordHash: user.passwordHash });
    if (!passwordIsCorrect) throw new UnauthorizedException();

    const token = generateToken({ id: user.id, purpose: 'session' });

    const miliseconds = secondsTokenIsValid * 1000;
    res.cookie(cookieNames.token, token, {
      domain: env.DOMAIN,
      httpOnly: true,
      maxAge: miliseconds,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    return {};
  }
}
