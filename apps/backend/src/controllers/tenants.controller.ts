import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { IsString } from 'class-validator';
import { TypeApiTenants } from '../../../domain/api/tenants';
import { permissions } from '../../../domain/permissions';
import { AuthGuard } from '../guards/auth.guard';
import { DbService } from '../services/db.service';

class TenantDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  domain: string;
}

@Controller('tenants')
export class TenantsController {
  constructor(private readonly dbService: DbService) {}

  @UseGuards(AuthGuard(permissions.tenant.read))
  @Get()
  async getAll(): Promise<TypeApiTenants['getAll']['response']> {
    const tenants = await this.dbService.tenants.getAll();
    return tenants;
  }

  @UseGuards(AuthGuard(permissions.tenant.read))
  @Get(':tenantId')
  async get(@Param('tenantId', ParseIntPipe) tenantId: number): Promise<TypeApiTenants['get']['response']> {
    const newTenant = await this.dbService.tenants.get({ tenantId });
    if (!newTenant) throw new NotFoundException();
    return newTenant;
  }

  @UseGuards(AuthGuard(permissions.tenant.create))
  @Post()
  async create(@Body() createTenantDto: TenantDto): Promise<TypeApiTenants['create']['response']> {
    const newTenant = await this.dbService.tenants.create(createTenantDto);
    return newTenant;
  }

  @UseGuards(AuthGuard(permissions.tenant.update))
  @Put(':tenantId')
  async update(@Param('tenantId', ParseIntPipe) tenantId: number, @Body() createTenantDto: TenantDto): Promise<TypeApiTenants['update']['response']> {
    const newTenant = await this.dbService.tenants.update(tenantId, createTenantDto);
    return newTenant;
  }

  @UseGuards(AuthGuard(permissions.tenant.delete))
  @Delete(':tenantId')
  async remove(@Param('tenantId', ParseIntPipe) tenantId: number): Promise<TypeApiTenants['delete']['response']> {
    const removedTenant = await this.dbService.tenants.remove({ tenantId });
    if (!removedTenant) throw new NotFoundException();
    return removedTenant;
  }
}
