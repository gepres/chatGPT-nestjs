import OpenAI from "openai";
import * as path from "path";
import * as fs from 'fs';
import { NotFoundException } from "@nestjs/common";

export const imageGeneratorGetterUseCase = async (openai: OpenAI, fileName: string) => {
  const filePath = path.resolve('./', './generated/images/',`${fileName}`);
  const exists = fs.existsSync(filePath);
  if (!exists) throw new NotFoundException(`File ${fileName} not found`);
  return filePath;
}