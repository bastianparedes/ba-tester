import { Type } from 'class-transformer';
import { IsIn, IsInt, IsString, ValidateIf, ValidateNested } from 'class-validator';
import constants from '../../../../domain/constants';
import { IsJsCode } from './jsValidator';

/* ---------- DATA DTOs ---------- */

class ClickOnElementDataDto {
  @IsString()
  selector: string;
}

class CustomTriggerDataDto {
  @IsString()
  name: string;

  @IsString()
  @IsJsCode()
  javascript: string;
}

class PageLoadDataDto {}

class TimeOnPageDataDto {
  @IsInt()
  milliseconds: number;
}

/* ---------- MAIN DTO ---------- */

export class TriggerDto {
  @IsInt()
  readonly id: number;

  @IsIn(Object.values(constants.triggerTypes))
  type: keyof typeof constants.triggerTypes;

  @ValidateIf((o) => o.type === constants.triggerTypes.clickOnElement)
  @ValidateNested()
  @Type(() => ClickOnElementDataDto)

  @ValidateIf((o) => o.type === constants.triggerTypes.custom)
  @ValidateNested()
  @Type(() => CustomTriggerDataDto)

  @ValidateIf((o) => o.type === constants.triggerTypes.pageLoad)
  @ValidateNested()
  @Type(() => PageLoadDataDto)

  @ValidateIf((o) => o.type === constants.triggerTypes.timeOnPage)
  @ValidateNested()
  @Type(() => TimeOnPageDataDto)
  data: ClickOnElementDataDto | CustomTriggerDataDto | PageLoadDataDto | TimeOnPageDataDto;
}
