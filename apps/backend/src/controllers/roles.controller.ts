import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IsArray, IsIn, IsNotIn, IsString } from 'class-validator';
import { TypeApiRoles } from '../../../domain/api/roles';
import { superAdminRoleName } from '../../../domain/config';
import { flatPermissions, permissions } from '../../../domain/permissions';
import { AuthGuard } from '../guards/auth.guard';
import { DbService } from '../services/db.service';

class RoleDto {
  @IsNotIn([superAdminRoleName])
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsIn(flatPermissions, { each: true })
  permissions: string[];
}

@Controller('admin/roles')
export class RolesController {
  constructor(private readonly dbService: DbService) {}

  @UseGuards(AuthGuard(permissions.role.read))
  @Get()
  async getAll(): Promise<TypeApiRoles['getAll']['response']> {
    const roles = await this.dbService.roles.getAll();
    return roles;
  }

  @UseGuards(AuthGuard(permissions.role.create))
  @Post()
  async create(@Body() body: RoleDto): Promise<TypeApiRoles['create']['response']> {
    const role = await this.dbService.roles.create(body);
    return role;
  }

  @UseGuards(AuthGuard(permissions.role.update))
  @Put(':roleId')
  async update(@Param('roleId') roleId: string, @Body() body: RoleDto): Promise<TypeApiRoles['update']['response']> {
    const role = await this.dbService.roles.update({ roleId }, body);
    return role;
  }

  @UseGuards(AuthGuard(permissions.role.delete))
  @Delete(':roleId')
  async remove(@Param('roleId') roleId: string): Promise<TypeApiRoles['delete']['response']> {
    await this.dbService.roles.remove({ roleId });
    return {};
  }
}
