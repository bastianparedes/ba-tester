import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { TypeApiRoles } from '../../../domain/types/api/roles';
import { type AssertEqual } from '../../../domain/types/utils';
import { AuthGuard } from '../guards/auth.guard';
import { flatPermissions, permissions } from '../libs/constants';
import { ZodValidationPipe } from '../pipes/zod';
import { DbService } from '../services/db.service';

/* ---------- SCHEMAS ---------- */
const roleSchema = z
  .object({
    description: z.string(),
    name: z.string(),
    permissions: z
      .array(z.enum(flatPermissions as [string, ...string[]]))
      .optional()
      .default([]),
  })
  .strip();

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
  async create(
    @Body(new ZodValidationPipe(roleSchema)) body: AssertEqual<z.infer<typeof roleSchema>, TypeApiRoles['create']['request']['body']>,
  ): Promise<TypeApiRoles['create']['response']> {
    await this.dbService.roles.create(body);
    return {};
  }

  @UseGuards(AuthGuard(permissions.role.update))
  @Put(':roleId')
  async update(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body(new ZodValidationPipe(roleSchema)) body: AssertEqual<z.infer<typeof roleSchema>, TypeApiRoles['update']['request']['body']>,
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
