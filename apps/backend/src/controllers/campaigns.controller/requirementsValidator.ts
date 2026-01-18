import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import commonConstants from '@/domain/constants';

// --------------------
// Node
// --------------------
export class NodeData {
  @ValidateNested({ each: true })
  @Type(() => RequirementDto) // Recursión
  @IsArray()
  children: RequirementDto[];

  @IsIn([commonConstants.booleanOperators.and, commonConstants.booleanOperators.or])
  operator: string;
}

export class NodeRequirement {
  @IsIn([commonConstants.requirementTypes.node])
  type: string;

  @ValidateNested()
  @Type(() => NodeData)
  data: NodeData;
}

// --------------------
// Device
// --------------------
export class DeviceData {
  @IsIn([commonConstants.comparisons.is, commonConstants.comparisons.isNot])
  comparator: string;

  @IsIn([commonConstants.devices.desktop, commonConstants.devices.mobile])
  device: string;
}

export class DeviceRequirement {
  @IsIn([commonConstants.requirementTypes.device])
  type: string;

  @ValidateNested()
  @Type(() => DeviceData)
  data: DeviceData;
}

// --------------------
// URL
// --------------------
export class URLData {
  @IsIn([commonConstants.comparisons.is, commonConstants.comparisons.isNot, commonConstants.comparisons.contains, commonConstants.comparisons.doesNotContain])
  comparator: string;

  @IsString()
  value: string;
}

export class URLRequirement {
  @IsIn([commonConstants.requirementTypes.url])
  type: string;

  @ValidateNested()
  @Type(() => URLData)
  data: URLData;
}

// --------------------
// Custom
// --------------------
export class CustomData {
  @IsString()
  javascript: string;

  @IsString()
  name: string;
}

export class CustomRequirement {
  @IsIn([commonConstants.requirementTypes.custom])
  type: string;

  @ValidateNested()
  @Type(() => CustomData)
  data: CustomData;
}

// --------------------
// Cookie / Storage / Query
// --------------------
export class ComparatorWithValue {
  @IsIn([commonConstants.comparisons.is, commonConstants.comparisons.isNot, commonConstants.comparisons.contains, commonConstants.comparisons.doesNotContain])
  comparator: string;

  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class ComparatorWithoutValue {
  @IsIn([commonConstants.comparisons.exists, commonConstants.comparisons.doesNotExist])
  comparator: string;

  @IsString()
  name: string;

  @IsOptional()
  value?: undefined;
}

export class CookieStorageQueryData {
  @ValidateNested()
  @Type(() => Object)
  comparator: ComparatorWithValue | ComparatorWithoutValue;
}

export class CookieStorageQueryRequirement {
  @IsIn([
    commonConstants.requirementTypes.cookie,
    commonConstants.requirementTypes.localStorage,
    commonConstants.requirementTypes.sessionStorage,
    commonConstants.requirementTypes.queryParam,
  ])
  type: string;

  @ValidateNested()
  @Type(() => CookieStorageQueryData)
  data: CookieStorageQueryData;
}

// --------------------
// Polymorphic wrapper
// --------------------
export class RequirementDto {
  @Transform(({ obj }) => {
    switch (obj.type) {
      case commonConstants.requirementTypes.node:
        return Object.assign(new NodeRequirement(), obj);
      case commonConstants.requirementTypes.device:
        return Object.assign(new DeviceRequirement(), obj);
      case commonConstants.requirementTypes.url:
        return Object.assign(new URLRequirement(), obj);
      case commonConstants.requirementTypes.custom:
        return Object.assign(new CustomRequirement(), obj);
      case commonConstants.requirementTypes.cookie:
      case commonConstants.requirementTypes.localStorage:
      case commonConstants.requirementTypes.sessionStorage:
      case commonConstants.requirementTypes.queryParam:
        return Object.assign(new CookieStorageQueryRequirement(), obj);
      default:
        return obj;
    }
  })
  @ValidateNested()
  data: any;

  @IsString()
  type: string;
}
