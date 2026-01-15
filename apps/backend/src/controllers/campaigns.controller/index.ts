import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString, Max, Min, ValidateNested } from 'class-validator';
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

  @IsInt()
  quantity: number;

  @IsArray()
  @IsEnum(commonConstants.campaignStatus, { each: true })
  statusList: typeof commonConstants.campaignStatus;
}

// --------------------
// Triggers DTO
// --------------------
class ClickTrigger {
  @ValidateNested()
  @Type(() => Object)
  data: { selector: string };

  @IsInt()
  readonly id: number;

  @IsEnum([commonConstants.triggerTypes.clickOnElement])
  type: string;
}

class CustomTrigger {
  @ValidateNested()
  @Type(() => Object)
  data: { javascript: string; name: string };

  @IsInt()
  readonly id: number;

  @IsEnum([commonConstants.triggerTypes.custom])
  type: string;
}

class PageLoadTrigger {
  @ValidateNested()
  @Type(() => Object)
  data: {};

  @IsInt()
  readonly id: number;

  @IsEnum([commonConstants.triggerTypes.pageLoad])
  type: string;
}

class TimeOnPageTrigger {
  @ValidateNested()
  @Type(() => Object)
  data: { milliseconds: number };

  @IsInt()
  readonly id: number;

  @IsEnum([commonConstants.triggerTypes.timeOnPage])
  type: string;
}
export class CreateCampaignDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => RequirementDto)
  requirements: RequirementDto;

  @IsEnum(commonConstants.campaignStatus)
  status: string;

  @Type(() => TriggersDto)
  @IsArray()
  triggers: TriggersDto;

  @Type(() => VariationsDto)
  @IsArray()
  variations: VariationsDto;
}

// --------------------
// Controller
// --------------------
@Controller('tenants/:tenantId/campaigns')
export class CampaignsController {
    constructor(private readonly dbService: DbService) {}

  // GET /tenants/:tenantId/campaigns
  @Get()
  async getCampaigns(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Query() query: GetCampaignsQueryDto,
  ) {
    // Validación automática via ValidationPipe
    // Ajuste de quantity según config.quantitiesAvailable
    if (![25, 50, 100, 200, 500].includes(query.quantity)) {
      return { status: 400, errors: [`Debe ser uno de: ${[25, 50, 100, 200, 500].join(', ')}`] };
    }

    const result = await this.dbService.campaigns.getMany({ tenantId }, query);
    return { data: result };
  }

  // POST /tenants/:tenantId/campaigns
  @Post()
  async createCampaign(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Body() body: CreateCampaignDto,
  ) {
    // Aquí body.requirements ya está validado y transformado
    await this.dbService.campaigns.create({ tenantId }, body);
    return { message: 'Campaign created successfully' };
  }
}
