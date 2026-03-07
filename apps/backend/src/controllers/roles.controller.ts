import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { TypeApiRoles } from '../../../domain/api/roles';
import { flatPermissions, permissions } from '../../../domain/permissions';
import { AuthGuard } from '../guards/auth.guard';
import { ZodValidationPipe } from '../pipes/zod';
import { DbService } from '../services/db.service';

/* ---------- SCHEMAS ---------- */
const roleSchema = z.object({
  name: z.string(),
  description: z.string(),
  permissions: z
    .array(z.enum(flatPermissions as [string, ...string[]]))
    .optional()
    .default([]),
});

/* ---------- CONTROLLER ---------- */

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
  async create(@Body(new ZodValidationPipe(roleSchema)) body: z.infer<typeof roleSchema>): Promise<TypeApiRoles['create']['response']> {
    await this.dbService.roles.create(body);
    return {};
  }

  @UseGuards(AuthGuard(permissions.role.update))
  @Put(':roleId')
  async update(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body(new ZodValidationPipe(roleSchema)) body: z.infer<typeof roleSchema>,
  ): Promise<TypeApiRoles['update']['response']> {
    await this.dbService.roles.update({
      roleId,
      updates: body,
    });

    return {};
  }

  @UseGuards(AuthGuard(permissions.role.delete))
  @Delete(':roleId')
  async remove(@Param('roleId', ParseIntPipe) roleId: number): Promise<TypeApiRoles['delete']['response']> {
    await this.dbService.roles.remove({ roleId });
    return {};
  }
}
