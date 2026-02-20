import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsString, ValidateNested } from 'class-validator';
import { TypeApiCampaigns } from '../../../../domain/api/campaigns';
import { quantitiesAvailable } from '../../../../domain/config';
import commonConstants from '../../../../domain/constants';
import { permissions } from '../../../../domain/permissions';
import { TypeCampaign } from '../../../../domain/types';
import { AuthGuard } from '../../guards/auth.guard';
import { DbService } from '../../services/db.service';
import { ScriptService } from '../../services/script.service';
import { RequirementDto } from './requirementsValidator';
import { TriggerDto } from './triggersValidator';
import { VariationDto } from './variationsValidator';

export class GetCampaignsQueryDto {
  @IsString()
  textSearch: string;

  @IsIn(['status', 'name', 'id'])
  orderBy: 'status' | 'name' | 'id';

  @IsIn(commonConstants.campaignOrderDirection)
  orderDirection: (typeof commonConstants.campaignOrderDirection)[number];

  @Type(() => Number)
  @IsInt()
  page: number;

  @Type(() => Number)
  @IsIn(quantitiesAvailable)
  quantity: number;

  @IsArray()
  @IsIn(commonConstants.campaignStatus, { each: true })
  statusList: typeof commonConstants.campaignStatus;
}

export class CampaignDto {
  @IsString()
  name: string;

  @IsIn(commonConstants.campaignStatus)
  status: (typeof commonConstants.campaignStatus)[number];

  @ValidateNested()
  @Type(() => RequirementDto)
  requirements: TypeCampaign['requirements'];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TriggerDto)
  triggers: TypeCampaign['triggers'];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariationDto)
  variations: TypeCampaign['variations'];
}

@Controller('tenants/:tenantId/campaigns')
export class CampaignsController {
  constructor(private readonly dbService: DbService, readonly scriptService: ScriptService) {}

  @UseGuards(AuthGuard(permissions.campaign.read))
  @Get()
  async getMany(@Param('tenantId', ParseIntPipe) tenantId: number, @Query() query: GetCampaignsQueryDto): Promise<TypeApiCampaigns['getMany']['response']> {
    const campaigns = await this.dbService.campaigns.getMany({ tenantId }, query);
    return campaigns;
  }

  @UseGuards(AuthGuard(permissions.campaign.read))
  @Get(':campaignId')
  async get(@Param('tenantId', ParseIntPipe) tenantId: number, @Param('campaignId', ParseIntPipe) campaignId: number): Promise<TypeApiCampaigns['get']['response']> {
    const result = await this.dbService.campaigns.get({ tenantId, campaignId });
    if (!result) throw new NotFoundException();
    return result;
  }

  @UseGuards(AuthGuard(permissions.campaign.create))
  @Post()
  async create(@Param('tenantId', ParseIntPipe) tenantId: number, @Body() body: CampaignDto): Promise<TypeApiCampaigns['create']['response']> {
    await this.dbService.campaigns.create({ tenantId }, body);
    await this.scriptService.populateScript({ tenantId });
    return {};
  }

  @UseGuards(AuthGuard(permissions.campaign.update))
  @Put(':campaignId')
  async update(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('campaignId', ParseIntPipe) campaignId: number,
    @Body() body: CampaignDto,
  ): Promise<TypeApiCampaigns['update']['response']> {
    await this.dbService.campaigns.update({ tenantId, campaignId }, body);
    await this.scriptService.populateScript({ tenantId });
    return {};
  }
}
