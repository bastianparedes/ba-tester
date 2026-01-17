import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsString, ValidateNested } from 'class-validator';
import { TypeApiCampaigns } from '@/domain/api/campaigns';
import { quantitiesAvailable } from '@/domain/config';
import commonConstants from '@/domain/constants';
import { DbService } from '@/services/db.service';
import { RequirementDto } from './requirementsValidator';
import { TriggersDto } from './triggersValidator';
import { VariationsDto } from './variationsValidator';

// --------------------
// GET DTO
// --------------------
export class GetCampaignsQueryDto {
  @IsString()
  textSearch: string;

  @IsEnum(['status', 'name', 'id'])
  orderBy: 'status' | 'name' | 'id';

  @IsEnum(commonConstants.campaignOrderDirection)
  orderDirection: (typeof commonConstants.campaignOrderDirection)[number];

  @IsInt()
  page: number;

  @IsEnum(quantitiesAvailable)
  @IsInt()
  quantity: number;

  @IsArray()
  @IsEnum(commonConstants.campaignStatus, { each: true })
  statusList: typeof commonConstants.campaignStatus;
}

export class CampaignDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => RequirementDto)
  requirements: RequirementDto;

  @IsEnum(commonConstants.campaignStatus)
  status: (typeof commonConstants.campaignStatus)[number];

  @Type(() => TriggersDto)
  @IsArray()
  triggers: TriggersDto;

  @Type(() => VariationsDto)
  @IsArray()
  variations: VariationsDto;
}

@Controller('tenants/:tenantId/campaigns')
export class CampaignsController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  async getMany(@Param('tenantId', ParseIntPipe) tenantId: number, @Query() query: GetCampaignsQueryDto): Promise<TypeApiCampaigns['getMany']['response']> {
    const campaigns = await this.dbService.campaigns.getMany({ tenantId }, query);
    return campaigns;
  }

  @Get()
  async get(@Param('tenantId', ParseIntPipe) tenantId: number, @Param('campaignId', ParseIntPipe) campaignId: number): Promise<TypeApiCampaigns['get']['response']> {
    const result = await this.dbService.campaigns.get({ tenantId, campaignId });
    return result;
  }

  @Post()
  async create(@Param('tenantId', ParseIntPipe) tenantId: number, @Body() body: CampaignDto): Promise<TypeApiCampaigns['create']['response']> {
    await this.dbService.campaigns.create({ tenantId }, body as any);
    return undefined;
  }

  // POST /tenants/:tenantId/campaigns
  @Put()
  async update(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('campaignId', ParseIntPipe) campaignId: number,
    @Body() body: CampaignDto,
  ): Promise<TypeApiCampaigns['update']['response']> {
    await this.dbService.campaigns.update({ tenantId, campaignId }, body as any);
    return;
  }
}
