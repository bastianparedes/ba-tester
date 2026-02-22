import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { TypeApiUsers } from '../../../domain/api/users';
import { cookieNames } from '../../../domain/config';
import { permissions } from '../../../domain/permissions';
import { AuthGuard } from '../guards/auth.guard';
import { getTokenData } from '../libs/auth/jwt';
import { DbService } from '../services/db.service';
import { type Request } from '../types/request';

class RoleDto {
  @IsString()
  id: string;
}

class NewUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @ValidateNested()
  @Type(() => RoleDto)
  role: RoleDto;
}

class OldUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @ValidateNested()
  @Type(() => RoleDto)
  role: RoleDto;
}

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
  async create(@Body() body: NewUserDto, @Req() req: Request): Promise<TypeApiUsers['create']['response']> {
    const user = req.user;
    if (!user) throw new UnauthorizedException();

    const role = await this.dbService.roles.get({ id: body.role.id });
    if (!role) throw new BadRequestException();

    const newUser = await this.dbService.users.create(body);
    return newUser;
  }

  @UseGuards(AuthGuard(permissions.user.update))
  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() body: OldUserDto, @Req() req: Request): Promise<TypeApiUsers['update']['response']> {
    const user = req.user;
    if (!user) throw new UnauthorizedException();

    const currentUser = await this.dbService.users.get({ userId });
    if (!currentUser) throw new BadRequestException();

    const newRole = await this.dbService.roles.get({ id: body.role.id });
    if (!newRole) throw new BadRequestException();

    const newUser = await this.dbService.users.update({ userId }, body);
    return newUser;
  }

  @UseGuards(AuthGuard(permissions.user.delete))
  @Delete(':userId')
  async remove(@Param('userId') userId: string, @Req() req: Request): Promise<TypeApiUsers['delete']['response']> {
    const user = req.user;
    if (!user) throw new UnauthorizedException();

    const currentUser = await this.dbService.users.get({ userId });
    if (!currentUser) throw new BadRequestException();

    await this.dbService.users.remove({ userId });
    return {};
  }
}
