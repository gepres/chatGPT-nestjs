import { IsString } from "class-validator";

export class TextToAudioDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  readonly voice: string;
}