import { Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import constants from '../../../../domain/constants';
import { IsJsCode } from './jsValidator';

/* ======================================================
  Shared DTOs
====================================================== */

class StorageComparisonDto {
  @IsString()
  name: string;

  @IsIn([
    constants.comparisons.is,
    constants.comparisons.isNot,
    constants.comparisons.contains,
    constants.comparisons.doesNotContain,
    constants.comparisons.exists,
    constants.comparisons.doesNotExist,
  ])
  comparator: 'is' | 'isNot' | 'contains' | 'doesNotContain' | 'exists' | 'doesNotExist';

  @IsOptional()
  @IsString()
  value?: string;
}

/* ======================================================
  Data DTOs (subobjetos)
====================================================== */

class CustomDataDto {
  @IsString()
  name: string;

  @IsString()
  @IsJsCode()
  javascript: string;
}

class DeviceDataDto {
  @IsIn([constants.comparisons.is, constants.comparisons.isNot])
  comparator: 'is' | 'isNot';

  @IsIn([constants.devices.desktop, constants.devices.mobile])
  device: 'desktop' | 'mobile';
}

class UrlDataDto {
  @IsIn([constants.comparisons.is, constants.comparisons.isNot, constants.comparisons.contains, constants.comparisons.doesNotContain])
  comparator: 'is' | 'isNot' | 'contains' | 'doesNotContain';

  @IsString()
  value: string;
}

/* ======================================================
  Leaf Requirements
====================================================== */

export class CookieRequirementDto {
  @IsIn([constants.requirementTypes.cookie])
  type: 'cookie';

  @ValidateNested()
  @Type(() => StorageComparisonDto)
  data: StorageComparisonDto;
}

export class LocalStorageRequirementDto {
  @IsIn([constants.requirementTypes.localStorage])
  type: 'localStorage';

  @ValidateNested()
  @Type(() => StorageComparisonDto)
  data: StorageComparisonDto;
}

export class SessionStorageRequirementDto {
  @IsIn([constants.requirementTypes.sessionStorage])
  type: 'sessionStorage';

  @ValidateNested()
  @Type(() => StorageComparisonDto)
  data: StorageComparisonDto;
}

export class QueryParamRequirementDto {
  @IsIn([constants.requirementTypes.queryParam])
  type: 'queryParam';

  @ValidateNested()
  @Type(() => StorageComparisonDto)
  data: StorageComparisonDto;
}

export class CustomRequirementDto {
  @IsIn([constants.requirementTypes.custom])
  type: 'custom';

  @ValidateNested()
  @Type(() => CustomDataDto)
  data: CustomDataDto;
}

export class DeviceRequirementDto {
  @IsIn([constants.requirementTypes.device])
  type: 'device';

  @ValidateNested()
  @Type(() => DeviceDataDto)
  data: DeviceDataDto;
}

export class UrlRequirementDto {
  @IsIn([constants.requirementTypes.url])
  type: 'url';

  @ValidateNested()
  @Type(() => UrlDataDto)
  data: UrlDataDto;
}

/* ======================================================
  Recursive Node
====================================================== */

export class NodeDataDto {
  @IsIn([constants.booleanOperators.and, constants.booleanOperators.or])
  operator: 'and' | 'or';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequirementDto)
  children: RequirementDto[];
}

export class NodeRequirementDto {
  @IsIn([constants.requirementTypes.node])
  type: 'node';

  @ValidateNested()
  @Type(() => NodeDataDto)
  data: NodeDataDto;
}

export type Requirement =
  | NodeRequirementDto
  | CookieRequirementDto
  | LocalStorageRequirementDto
  | SessionStorageRequirementDto
  | QueryParamRequirementDto
  | CustomRequirementDto
  | DeviceRequirementDto
  | UrlRequirementDto;

export class RequirementDto {
  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { name: constants.requirementTypes.node, value: NodeRequirementDto },
        { name: constants.requirementTypes.cookie, value: CookieRequirementDto },
        { name: constants.requirementTypes.localStorage, value: LocalStorageRequirementDto },
        { name: constants.requirementTypes.sessionStorage, value: SessionStorageRequirementDto },
        { name: constants.requirementTypes.queryParam, value: QueryParamRequirementDto },
        { name: constants.requirementTypes.custom, value: CustomRequirementDto },
        { name: constants.requirementTypes.device, value: DeviceRequirementDto },
        { name: constants.requirementTypes.url, value: UrlRequirementDto },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  value: Requirement;
}
