import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Max, Min } from 'class-validator';

class VariationDto {
  @IsString() css: string;
  @IsString() html: string;
  @IsInt() id: number;
  @IsString() javascript: string;
  @IsString() name: string;
  @IsInt()
  @Min(0)
  @Max(100)
  traffic: number;
}

export class VariationsDto {
  @IsArray()
  @Type(() => VariationDto)
  variations: VariationDto[];
}
