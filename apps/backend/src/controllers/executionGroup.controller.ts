import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { TypeApiExecutionGroups } from '../../../domain/api/executionGroups';
import { quantitiesAvailable } from '../../../domain/config';
import commonConstants from '../../../domain/constants';
import { permissions } from '../../../domain/permissions';
import { AuthGuard } from '../guards/auth.guard';
import { ZodValidationPipe } from '../pipes/zod';
import { DbService } from '../services/db.service';

/* ---------- QUERY SCHEMA ---------- */

const getExecutionGroupsQuerySchema = z.object({
  orderBy: z.enum(['name', 'id']),

  orderDirection: z.enum(commonConstants.executionGroupOrderDirection),

  page: z.coerce.number().int(),

  quantity: z.coerce
    .number()
    .int()
    .refine((v) => quantitiesAvailable.includes(v), { message: 'Invalid quantity' }),
  textSearch: z.string(),
});

type GetExecutionGroupsQueryDto = z.infer<typeof getExecutionGroupsQuerySchema>;

/* ---------- BODY SCHEMA ---------- */

const executionGroupSchema = z.object({
  campaignIds: z.array(z.number().int()),
  name: z.string(),

  onlyCampaignsPreviouslyExecuted: z.boolean(),

  onlyOneCampaignPerPageLoad: z.boolean(),

  waitForEveryCampaignToBeEvaluated: z.boolean(),
});

type ExecutionGroupDto = z.infer<typeof executionGroupSchema>;

/* ---------- CONTROLLER ---------- */

@Controller('tenants/:tenantId/execution-groups')
export class ExecutionGroupsController {
  constructor(private readonly dbService: DbService) {}

  @UseGuards(AuthGuard(permissions.executionGroup.read))
  @Get()
  async getMany(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Query(new ZodValidationPipe(getExecutionGroupsQuerySchema)) query: GetExecutionGroupsQueryDto,
  ): Promise<TypeApiExecutionGroups['getMany']['response']> {
    const executionGroups = await this.dbService.executionGroup.getMany({
      params: query,
      tenantId,
    });

    return executionGroups;
  }

  @UseGuards(AuthGuard(permissions.executionGroup.read))
  @Get(':executionGroupId')
  async get(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('executionGroupId', ParseIntPipe) executionGroupId: number,
  ): Promise<TypeApiExecutionGroups['get']['response']> {
    const result = await this.dbService.executionGroup.get({
      executionGroupId,
      tenantId,
    });

    if (!result) throw new NotFoundException();

    const { campaigns, executionGroup } = result;

    return { campaigns, executionGroup };
  }

  @UseGuards(AuthGuard(permissions.executionGroup.create))
  @Post()
  async create(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Body(new ZodValidationPipe(executionGroupSchema)) body: ExecutionGroupDto,
  ): Promise<TypeApiExecutionGroups['create']['response']> {
    const { campaignIds, ...values } = body;

    await this.dbService.executionGroup.create({
      campaignIds,
      tenantId,
      values,
    });

    return {};
  }

  @UseGuards(AuthGuard(permissions.executionGroup.update))
  @Put(':executionGroupId')
  async update(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('executionGroupId', ParseIntPipe) executionGroupId: number,
    @Body(new ZodValidationPipe(executionGroupSchema)) body: ExecutionGroupDto,
  ): Promise<TypeApiExecutionGroups['update']['response']> {
    const { campaignIds, ...values } = body;

    await this.dbService.executionGroup.update({
      campaignIds,
      executionGroupId,
      tenantId,
      values,
    });

    return {};
  }

  @UseGuards(AuthGuard(permissions.executionGroup.delete))
  @Put(':executionGroupId/remove')
  async remove(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('executionGroupId', ParseIntPipe) executionGroupId: number,
  ): Promise<TypeApiExecutionGroups['update']['response']> {
    await this.dbService.executionGroup.remove({
      executionGroupId,
      tenantId,
    });

    return {};
  }
}
