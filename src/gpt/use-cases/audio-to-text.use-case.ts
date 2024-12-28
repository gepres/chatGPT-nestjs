import OpenAI from "openai";
import * as fs from 'fs';


interface Options {
  audioFile: Express.Multer.File; 
  prompt?: string;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
  const { audioFile, prompt } = options;


  console.log({
    prompt,audioFile
  });
  const response = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: fs.createReadStream(audioFile.path),
    prompt: prompt, // mismo idioma que el audio
    language: "es",
    // response_format: "vtt",
    response_format: "verbose_json",
  });

  console.log('response', response);
  
  return response;
}