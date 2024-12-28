import { Injectable } from '@nestjs/common';
import { audioToTextUseCase, extractTextFromImageUseCase, imageGenerationUseCase, imageGeneratorGetterUseCase, imageVariationUseCase, orthographyCheckUseCase,prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase, textToAudioGetterUseCase, textToAudioUseCase, translateStreamUseCase, translateUseCase } from './use-cases';
import { AudioToTextDto, ExtractTextFromImageDto, ImageGenerationDto, ImageValidationDto, OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import OpenAI from "openai";

@Injectable()
export class GptService {
  // solo va a llamar casos de uso

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  

  async orthographyCheck(orthography: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthography.prompt,
    });
  }

  async prosConsDicusser(prosConsDiscusser: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusser.prompt,
    });
  }

  async prosConsDicusserStream(prosConsDiscusser: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt: prosConsDiscusser.prompt,
    });
  }


  async translate(translate: TranslateDto) {
    return await translateUseCase(this.openai, {
      prompt: translate.prompt,
      lang: translate.lang,
    });
  }

  async translateStream(translate: TranslateDto) {
    return await translateStreamUseCase(this.openai, {
      prompt: translate.prompt,
      lang: translate.lang,
    });
  }

  async textToAudio(textToAudio: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, {
      prompt: textToAudio.prompt,
      voice: textToAudio.voice,
    });
  }

  async textToAudioGetter(fileId: string) {
    return textToAudioGetterUseCase({id:fileId});
  }

  async audioToText(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {
    const {prompt} = audioToTextDto;

    return await audioToTextUseCase(this.openai, {
      audioFile,
      prompt,
    });
    
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, {...imageGenerationDto});
  }

  imageGeneratorGetter(fileName: string) {
    return imageGeneratorGetterUseCase(this.openai, fileName);
  }

  async imageValidation ({baseImage}: ImageValidationDto) {
     return await imageVariationUseCase(this.openai, {baseImage});
  }

  async extractTextFromImage(file: Express.Multer.File, extractTextFromImageDto: ExtractTextFromImageDto) {
    console.log({file, extractTextFromImageDto});
    
    return await extractTextFromImageUseCase(this.openai,{prompt: extractTextFromImageDto.prompt, imageFile: file} );
  }

}
