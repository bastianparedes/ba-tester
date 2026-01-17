import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { IsString } from 'class-validator';
import { permissions } from '@/domain/permissions';
import { AuthGuard } from '@/guards/auth.guard';
import { DbService } from '@/services/db.service';

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
  async findAll() {
    const tenants = await this.dbService.tenants.getAll();
    return { data: tenants };
  }

  @UseGuards(AuthGuard(permissions.tenant.create))
  @Post()
  async create(@Body() createTenantDto: TenantDto) {
    const newTenant = await this.dbService.tenants.create(createTenantDto);
    return { data: newTenant };
  }

  @UseGuards(AuthGuard(permissions.tenant.update))
  @Put(':tenantId')
  async update(@Param('tenantId', ParseIntPipe) tenantId: number, @Body() createTenantDto: TenantDto) {
    const newTenant = await this.dbService.tenants.update(tenantId, createTenantDto);
    return { data: newTenant };
  }
}
