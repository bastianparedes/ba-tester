import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { type Request } from '@/types/request';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('admin'))
  @Get()
  getHello(@Req() req: Request) {
    return {
      hola: 'hola',
      cookies: req.cookies.tokens,
      request: req.user,
    };
  }
}
