import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { type Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cookieNames } from '../../../domain/config';
import { generateToken, getTokenData, secondsTokenIsValid } from '../libs/auth/jwt';
import { env } from '../libs/env';
import { type Request } from '../types/request';

const minutes = 5;

@Injectable()
export class TokenRenewerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const http = context.switchToHttp();

    const request = http.getRequest<Request>();
    const token = request.cookies[cookieNames.token];
    if (!token) return next.handle();

    const tokenData = getTokenData({ purpose: 'session', token });
    if (!tokenData.valid) return next.handle();
    const response = http.getResponse<Response>();

    if (tokenData.secondsLeft <= minutes * 60) {
      const newToken = generateToken({ id: tokenData.id, purpose: 'session' });
      const miliseconds = secondsTokenIsValid * 1000;
      return next.handle().pipe(
        tap(() => {
          response.cookie(cookieNames.token, newToken, {
            domain: env.DOMAIN,
            httpOnly: true,
            maxAge: miliseconds,
            path: '/',
            sameSite: 'none',
            secure: true,
          });
        }),
      );
    }

    return next.handle().pipe(
      tap(() => {
        response.setHeader('X-Custom-Header', 'MiValor');
      }),
    );
  }
}
