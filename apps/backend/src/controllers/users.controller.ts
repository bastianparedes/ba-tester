import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { z } from 'zod';

import { TypeApiUsers } from '../../../domain/api/users';
import { cookieNames } from '../../../domain/config';
import { permissions } from '../../../domain/permissions';
import { TypeUser } from '../../../domain/types/user';

import { AuthGuard } from '../guards/auth.guard';
import { getTokenData } from '../libs/auth/jwt';
import { ZodValidationPipe } from '../pipes/zod';
import { DbService } from '../services/db.service';
import { type Request } from '../types/request';

/* ---------- SCHEMAS ---------- */

const newUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.number().int(),
});

type NewUserDto = z.infer<typeof newUserSchema>;

const oldUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  roleId: z.number().int(),
});

type OldUserDto = z.infer<typeof oldUserSchema>;

/* ---------- CONTROLLER ---------- */

@Controller('admin/users')
export class UsersController {
  constructor(private readonly dbService: DbService) {}

  @UseGuards(AuthGuard(permissions.user.read))
  @Get()
  async getAll(): Promise<TypeApiUsers['getAll']['response']> {
    const users = await this.dbService.users.getAll();
    return users;
  }

  @Get('user')
  async get(@Req() req: Request): Promise<TypeApiUsers['get']['response']> {
    const token = req.cookies[cookieNames.token];
    if (!token) throw new UnauthorizedException();

    const tokenData = getTokenData({ token, purpose: 'session' });
    if (!tokenData.valid) throw new UnauthorizedException();

    const userId = tokenData.id;

    const user = await this.dbService.users.get({ userId });
    if (!user) throw new UnauthorizedException();

    return user;
  }

  @UseGuards(AuthGuard(permissions.user.create))
  @Post()
  async create(@Body(new ZodValidationPipe(newUserSchema)) body: NewUserDto, @Req() req: Request): Promise<TypeApiUsers['create']['response']> {
    const user = req.user;
    if (!user) throw new UnauthorizedException();

    const role = await this.dbService.roles.get({ id: body.roleId });
    if (!role) throw new BadRequestException();

    await this.dbService.users.create(body);

    return {};
  }

  @UseGuards(AuthGuard(permissions.user.update))
  @Put(':userId')
  async update(
    @Param('userId') userId: TypeUser['id'],
    @Body(new ZodValidationPipe(oldUserSchema)) body: OldUserDto,
    @Req() req: Request,
  ): Promise<TypeApiUsers['update']['response']> {
    const user = req.user;
    if (!user) throw new UnauthorizedException();

    const currentUser = await this.dbService.users.get({ userId });
    if (!currentUser) throw new BadRequestException();

    const newRole = await this.dbService.roles.get({ id: body.roleId });
    if (!newRole) throw new BadRequestException();

    await this.dbService.users.update({ userId, updates: body });

    return {};
  }

  @UseGuards(AuthGuard(permissions.user.delete))
  @Delete(':userId')
  async remove(@Param('userId', ParseIntPipe) userId: number, @Req() req: Request): Promise<TypeApiUsers['delete']['response']> {
    const user = req.user;
    if (!user) throw new UnauthorizedException();

    const currentUser = await this.dbService.users.get({ userId });
    if (!currentUser) throw new BadRequestException();

    await this.dbService.users.remove({ userId });

    return {};
  }
}
