import { IsString, IsOptional } from "class-validator";

export class ImageValidationDto {
      @IsString()
      readonly baseImage: string;
}