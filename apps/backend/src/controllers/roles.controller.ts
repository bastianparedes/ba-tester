import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IsArray, IsIn, IsNotIn, IsString } from 'class-validator';
import { superAdminRoleName } from '@/domain/config';
import { flatPermissions } from '@/domain/permissions';
import { DbService } from '@/services/db.service';

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


@Controller('roles')
export class RolesController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  async getAll() {
    const roles = await this.dbService.roles.getAll();
    return { data: roles };
  }

  @Post()
  async create(@Body() body: RoleDto) {
    const role = await this.dbService.roles.create(body);
    return { data: role };
  }

  @Put(':roleId')
  async update(@Param('roleId') roleId: string, @Body() body: RoleDto) {
    const role = await this.dbService.roles.update({ roleId }, body);
    return { data: role };
  }

  @Delete(':roleId')
  async remove(@Param('roleId') roleId: string) {
    const newTenant = await this.dbService.roles.remove({ roleId });
    return { data: newTenant };
  }
}
