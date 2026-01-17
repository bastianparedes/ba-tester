import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { IsArray, IsIn, IsNotIn, IsString } from 'class-validator';
import { superAdminRoleName } from '@/domain/config';
import { flatPermissions } from '@/domain/permissions';
import { DbService } from '@/services/db.service';
import { AuthGuard } from '@/guards/auth.guard';
import { permissions } from '@/domain/permissions';
// import { type Request } from '@/types/request';
// , @Req() req: Request
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

  @UseGuards(AuthGuard(permissions.role.read))
  @Get()
  async getAll() {
    const roles = await this.dbService.roles.getAll();
    return { data: roles };
  }

  @UseGuards(AuthGuard(permissions.role.create))
  @Post()
  async create(@Body() body: RoleDto) {
    const role = await this.dbService.roles.create(body);
    return { data: role };
  }

  @UseGuards(AuthGuard(permissions.role.update))
  @Put(':roleId')
  async update(@Param('roleId') roleId: string, @Body() body: RoleDto) {
    const role = await this.dbService.roles.update({ roleId }, body);
    return { data: role };
  }

  @UseGuards(AuthGuard(permissions.role.delete))
  @Delete(':roleId')
  async remove(@Param('roleId') roleId: string) {
    const newTenant = await this.dbService.roles.remove({ roleId });
    return { data: newTenant };
  }
}
