import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import constants from '@/domain/constants';

// ----------------------
// Tipos de data por trigger
// ----------------------
class ClickOnElementTriggerData {
  @IsString()
  @IsNotEmpty()
  selector!: string;
}

class CustomTriggerData {
  @IsString()
  @IsNotEmpty()
  javascript!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}

class PageLoadTriggerData {
  @IsObject()
  data!: Record<string, never>;
}

class TimeOnPageTriggerData {
  @IsInt()
  milliseconds!: number;
}

// ----------------------
// Trigger base
// ----------------------
class TriggerDto {
  @IsInt()
  id!: number;

  @IsIn([constants.triggerTypes.clickOnElement, constants.triggerTypes.custom, constants.triggerTypes.pageLoad, constants.triggerTypes.timeOnPage])
  type!: keyof typeof constants.triggerTypes;

  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: ClickOnElementTriggerData, name: 'clickOnElement' },
        { value: CustomTriggerData, name: 'custom' },
        { value: PageLoadTriggerData, name: 'pageLoad' },
        { value: TimeOnPageTriggerData, name: 'timeOnPage' },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  data!: ClickOnElementTriggerData | CustomTriggerData | PageLoadTriggerData | TimeOnPageTriggerData;
}

// ----------------------
// DTO principal para triggers
// ----------------------
export class TriggersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TriggerDto)
  triggers!: TriggerDto[];
}
