import { IsOptional, IsString } from "class-validator";

export class AudioToTextDto {
  @IsOptional()
  @IsString()
  readonly prompt?: string;
}