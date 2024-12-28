import { IsOptional, IsString } from "class-validator";

export class ExtractTextFromImageDto {
  @IsOptional()
  @IsString()
  readonly prompt?: string;
}