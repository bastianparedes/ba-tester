import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { TypeApiCampaigns } from '../../../../domain/api/campaigns';
import { quantitiesAvailable } from '../../../../domain/config';
import commonConstants from '../../../../domain/constants';
import { permissions } from '../../../../domain/permissions';
import { AuthGuard } from '../../guards/auth.guard';
import { ZodValidationPipe } from '../../pipes/zod';
import { DbService } from '../../services/db.service';
import { nodeRequirementSchema } from './requirementsValidator';
import { triggerSchema } from './triggersValidator';
import { variationSchema } from './variationsValidator';

export const getCampaignsQuerySchema = z.object({
  orderBy: z.enum(['status', 'name', 'id']),
  orderDirection: z.enum(commonConstants.campaignOrderDirection),
  page: z.coerce.number().int(),
  quantity: z.coerce.number().refine((v) => quantitiesAvailable.includes(v), {
    message: 'Invalid quantity',
  }),
  statusList: z.array(z.enum(commonConstants.campaignStatus)),
  textSearch: z.string(),
});

export const campaignSchema = z.object({
  name: z.string(),
  requirements: nodeRequirementSchema,
  status: z.enum(commonConstants.campaignStatus),
  triggers: triggerSchema,
  variations: variationSchema,
});

@Controller('tenants/:tenantId/campaigns')
export class CampaignsController {
  constructor(private readonly dbService: DbService) {}

  @UseGuards(AuthGuard(permissions.campaign.read))
  @Get()
  async getMany(
    @Param('tenantId', ParseIntPipe) tenantId: number,

    @Query(new ZodValidationPipe(getCampaignsQuerySchema)) query: z.infer<typeof getCampaignsQuerySchema>,
  ): Promise<TypeApiCampaigns['getMany']['response']> {
    const campaigns = await this.dbService.campaigns.getMany({ params: query, tenantId });
    return campaigns;
  }

  @UseGuards(AuthGuard(permissions.campaign.read))
  @Get('getAllLight')
  async getAllLightVersion(@Param('tenantId', ParseIntPipe) tenantId: number): Promise<TypeApiCampaigns['getAllLight']['response']> {
    const campaigns = await this.dbService.campaigns.getAllLight({ tenantId });
    return { campaigns };
  }

  @UseGuards(AuthGuard(permissions.campaign.read))
  @Get(':campaignId')
  async get(@Param('tenantId', ParseIntPipe) tenantId: number, @Param('campaignId', ParseIntPipe) campaignId: number): Promise<TypeApiCampaigns['get']['response']> {
    const result = await this.dbService.campaigns.get({ campaignId, tenantId });
    if (!result) throw new NotFoundException();
    return result;
  }

  @UseGuards(AuthGuard(permissions.campaign.create))
  @Post()
  async create(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Body(new ZodValidationPipe(campaignSchema)) body: z.infer<typeof campaignSchema>,
  ): Promise<TypeApiCampaigns['create']['response']> {
    await this.dbService.campaigns.create({ tenantId, values: body });
    return {};
  }

  @UseGuards(AuthGuard(permissions.campaign.update))
  @Put(':campaignId')
  async update(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('campaignId', ParseIntPipe) campaignId: number,
    @Body(new ZodValidationPipe(campaignSchema)) body: z.infer<typeof campaignSchema>,
  ): Promise<TypeApiCampaigns['update']['response']> {
    await this.dbService.campaigns.update({ campaignId, tenantId, updates: body });
    return {};
  }

  @UseGuards(AuthGuard(permissions.campaign.delete))
  @Delete(':campaignId')
  async remove(@Param('tenantId', ParseIntPipe) tenantId: number, @Param('campaignId', ParseIntPipe) campaignId: number): Promise<TypeApiCampaigns['delete']['response']> {
    await this.dbService.campaigns.remove({ campaignId, tenantId });
    return {};
  }
}
