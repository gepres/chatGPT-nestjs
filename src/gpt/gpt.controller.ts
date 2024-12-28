import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GptService } from './gpt.service';
import { AudioToTextDto, ExtractTextFromImageDto, ImageGenerationDto, ImageValidationDto, OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  
  @Post('orthography-check')
  orthographyCheck(
    @Body() orthografyDto: OrthographyDto
  ) {
    return  this.gptService.orthographyCheck(orthografyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto
  ) {
    return this.gptService.prosConsDicusser(prosConsDiscusserDto)
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res:Response,
  ) { 
    const stream = await this.gptService.prosConsDicusserStream(prosConsDiscusserDto);
    res.setHeader('Content-Type', 'aplication/json');
    res.status(HttpStatus.OK)

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece);
    }

    res.end();
  }

  @Post('translate')
  translate(
    @Body() translateDto: TranslateDto
  ) {
    return this.gptService.translate(translateDto);
  }


  @Post('translate-stream')
  async translateStream(
    @Body() translateDto: TranslateDto,
    @Res() res:Response,
  ) {
    const stream = await this.gptService.translateStream(translateDto);
    res.setHeader('Content-Type', 'aplication/json');
    res.status(HttpStatus.OK)
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece);
    }

    res.end();
  }


  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res:Response,
  ) {
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filePath);
  }
  

  @Get('text-to-audio/:fileId')
   async textToAudioGetter(
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ) { 

   const filePath = await this.gptService.textToAudioGetter(fileId);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filePath);
  }

  @Post('audio-to-text')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './generated/uploads/',
      filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        const fileName = `${Date.now()}.${extension}`;
        cb(null, fileName);
      },
    }),
  }))
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File too bigger than 5 mb',
          }),
          new FileTypeValidator({
            fileType: 'audio/*',
          }),
        ]
      })
    ) file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto,
    ) {

      console.log({audioToTextDto});
      
      return await this.gptService.audioToText(file,audioToTextDto);
  }



  @Post('image-generation')
  async imageGeneration(
    @Body() imageGenerationDto: ImageGenerationDto,
  ) {
    return await this.gptService.imageGeneration(imageGenerationDto);
  }


  @Get('image-generation/:fileName')
  async imageGeneratorGetter(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  )  {
    const filePath = await this.gptService.imageGeneratorGetter(fileName);
    res.setHeader('Content-Type', 'image/png');
    res.status(HttpStatus.OK)
    res.sendFile(filePath);
  }


  @Post('image-generation-variation')
  async imageGenerationVariation(
    @Body() imageValidationDto: ImageValidationDto,
  ) {
    return await this.gptService.imageValidation(imageValidationDto);
  }


  @Post('extract-text-from-image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './generated/uploads/',
      filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        const fileName = `${Date.now()}.${extension}`;
        cb(null, fileName);
      },
    }),
  }))
  async extractTextFromImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File too bigger than 5 mb',
          }),
          new FileTypeValidator({
            fileType: 'image/*',
          }),
        ],
      })
    ) file: Express.Multer.File,
    @Body() extractTextFromImageDto: ExtractTextFromImageDto,
  ) {
    console.log({ file, extractTextFromImageDto });
  
    return await this.gptService.extractTextFromImage(file, extractTextFromImageDto);
  }



}
