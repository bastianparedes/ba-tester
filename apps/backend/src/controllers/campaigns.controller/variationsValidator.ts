import { IsInt, IsString, Max, Min } from 'class-validator';
import { IsJsCode } from './jsValidator';

export class VariationDto {
  @IsString() css: string;

  @IsString() html: string;

  @IsInt() id: number;

  @IsString()
  @IsJsCode()
  javascript: string;

  @IsString() name: string;

  @IsInt()
  @Min(0)
  @Max(100)
  traffic: number;
}
