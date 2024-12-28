import * as path from "path";
import * as fs from "fs";
import { NotFoundException } from "@nestjs/common";

interface Options {
  id: string;
}

export const textToAudioGetterUseCase = async ( options: Options) => {
  const { id } = options;
   const filePath = path.resolve(__dirname, '../../../generated/audios/',`${id}.mp3`);
  const wasFound = fs.existsSync(filePath);
  if (!wasFound) throw new NotFoundException(`File ${id} not found`);

  return filePath;
}