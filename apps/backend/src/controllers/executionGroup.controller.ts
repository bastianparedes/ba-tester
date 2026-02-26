import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsString } from 'class-validator';
import { TypeApiExecutionGroups } from '../../../domain/api/executionGroups';
import { quantitiesAvailable } from '../../../domain/config';
import commonConstants from '../../../domain/constants';
import { permissions } from '../../../domain/permissions';
import { TypeCampaign, TypeExecutionGroup } from '../../../domain/types';
import { AuthGuard } from '../guards/auth.guard';
import { DbService } from '../services/db.service';

export class GetExecutionGroupsQueryDto {
  @IsString()
  textSearch: string;

  @IsIn(['name', 'id'])
  orderBy: 'name' | 'id';

  @IsIn(commonConstants.executionGroupOrderDirection)
  orderDirection: (typeof commonConstants.executionGroupOrderDirection)[number];

  @Type(() => Number)
  @IsInt()
  page: number;

  @Type(() => Number)
  @IsIn(quantitiesAvailable)
  quantity: number;
}

export class ExecutionGroupDto {
  @IsString()
  name: TypeExecutionGroup['name'];

  @IsBoolean()
  persistCampaignAcrossReloads: TypeExecutionGroup['persistCampaignAcrossReloads'];

  @IsIn(commonConstants.executionStrategies)
  strategy: TypeExecutionGroup['strategy'];

  @IsArray()
  @IsInt({ each: true })
  campaignIds: TypeCampaign['id'][];
}

@Controller('tenants/:tenantId/execution-groups')
export class ExecutionGroupsController {
  constructor(private readonly dbService: DbService) {}

  @UseGuards(AuthGuard(permissions.executionGroup.read))
  @Get()
  async getMany(@Param('tenantId', ParseIntPipe) tenantId: number, @Query() query: GetExecutionGroupsQueryDto): Promise<TypeApiExecutionGroups['getMany']['response']> {
    const executionGroups = await this.dbService.executionGroup.getMany({ tenantId }, query);
    return executionGroups;
  }

  @UseGuards(AuthGuard(permissions.executionGroup.read))
  @Get(':executionGroupId')
  async get(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('executionGroupId', ParseIntPipe) executionGroupId: number,
  ): Promise<TypeApiExecutionGroups['get']['response']> {
    const result = await this.dbService.executionGroup.get({ tenantId, executionGroupId });
    if (!result) throw new NotFoundException();
    const { campaigns, executionGroup } = result;
    return { campaigns, executionGroup };
  }

  @UseGuards(AuthGuard(permissions.executionGroup.create))
  @Post()
  async create(@Param('tenantId', ParseIntPipe) tenantId: number, @Body() body: ExecutionGroupDto): Promise<TypeApiExecutionGroups['create']['response']> {
    const { campaignIds, ...values } = body;
    await this.dbService.executionGroup.create({ tenantId }, values, campaignIds);
    return {};
  }

  @UseGuards(AuthGuard(permissions.executionGroup.update))
  @Put(':executionGroupId')
  async update(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('executionGroupId', ParseIntPipe) executionGroupId: number,
    @Body() body: ExecutionGroupDto,
  ): Promise<TypeApiExecutionGroups['update']['response']> {
    const { campaignIds, ...values } = body;
    await this.dbService.executionGroup.update({ tenantId, executionGroupId }, values, campaignIds);
    return {};
  }
}
