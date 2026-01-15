import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { IsString } from 'class-validator';
import { DbService } from '@/services/db.service';

class CreateTenantDto {
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

  @Get()
  async findAll() {
    const tenants = await this.dbService.tenants.getAll();
    return { data: { tenants } };
  }

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto) {
    const newTenant = await this.dbService.tenants.create(createTenantDto);
    return { data: newTenant };
  }

  @Put(':tenantId')
  async update(@Param('tenantId', ParseIntPipe) tenantId: number, @Body() createTenantDto: CreateTenantDto) {
    const newTenant = await this.dbService.tenants.update(tenantId, createTenantDto);
    return { data: newTenant };
  }
}
