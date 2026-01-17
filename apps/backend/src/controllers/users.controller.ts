import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { superAdminRoleName } from '@/domain/config';
import { DbService } from '@/services/db.service';
import { AuthGuard } from '@/guards/auth.guard';
import { permissions, superAdminOnlyPermissions } from '@/domain/permissions';
import { type Request } from '@/types/request';

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

@Controller('users')
export class UsersController {
  constructor(
    private readonly dbService: DbService,
  ) {}

  @UseGuards(AuthGuard(permissions.user.read))
  @Get()
  async getAll() {
    const users = await this.dbService.users.getAll();
    return { data: users };
  }

  @UseGuards(AuthGuard(permissions.user.create))
  @Post()
  async create(@Body() body: NewUserDto, @Req() req: Request) {
    const user = req.user;
    if (!user) return;

    const role = await this.dbService.roles.get({ id: body.role.id });
    if (!role) return;
    const roleIsSuperAdmin = role.name === superAdminRoleName;
    if (roleIsSuperAdmin && !user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.create)) return;

    const newUser = await this.dbService.users.create(body);
    return { data: newUser };
  }

  @UseGuards(AuthGuard(permissions.user.update))
  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() body: OldUserDto, @Req() req: Request) {
    const user = req.user;
    if (!user) return;

    const currentUser = await this.dbService.users.get({userId});
    if (!currentUser) return;
    const currentUserIsSuperUser = currentUser.role.name === superAdminRoleName;
    if (currentUserIsSuperUser && !user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.update)) return;

    const newRole = await this.dbService.roles.get({ id: body.role.id });
    if (!newRole) return;
    const oldRole = user.role;
    const oldRoleIsSuperAdmin = oldRole.name === superAdminRoleName;
    const newRoleIsSuperAdmin = newRole.name === superAdminRoleName;
    if (!oldRoleIsSuperAdmin && newRoleIsSuperAdmin && !user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.create)) return;
    if (oldRoleIsSuperAdmin && !newRoleIsSuperAdmin && !user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.delete)) return;
    if (oldRoleIsSuperAdmin && !user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.update)) return;

    const newUser = await this.dbService.users.update({userId}, body);
    return { data: newUser };
  }

  @UseGuards(AuthGuard(permissions.user.delete))
  @Delete(':userId')
  async remove(@Param('userId') userId: string, @Req() req: Request) {
    const user = req.user;
    if (!user) return;

    const currentUser = await this.dbService.users.get({userId});
    if (!currentUser) return;
    const currentUserIsSuperUser = currentUser.role.name === superAdminRoleName;
    if (currentUserIsSuperUser && !user.role.permissions.includes(superAdminOnlyPermissions.superAdmin.delete)) return;


    const deletedUser = await this.dbService.users.remove({ userId });
    return { data: deletedUser };
  }
}
