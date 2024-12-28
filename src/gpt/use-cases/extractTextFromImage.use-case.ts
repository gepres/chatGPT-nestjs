
import OpenAI from "openai";
import * as fs from 'fs';

interface Options {
  prompt?: string;
  imageFile: Express.Multer.File;
}

const convertToBase64 = async (file: Express.Multer.File) => {
  const data = fs.readFileSync(file.path);
  const base64 = Buffer.from(data).toString('base64');
  return `data:image/${file.mimetype.split('/')[1]};base64,${base64}`;
}


export const extractTextFromImageUseCase = async ( openai: OpenAI, options: Options) => {
   const { prompt, imageFile } = options;


   console.log({prompt, imageFile});
   

   const response = await openai.chat.completions.create({
    model:'gpt-4o-mini',
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": prompt ?? '¿ Qué logras ver en la imagen?'
          },
          {
            "type": "image_url",
            "image_url": {
              "url": await convertToBase64(imageFile)
            }
          }
        ]
      },
    ],
    max_tokens: 1000
  });

  return {
    message: response.choices[0].message.content
  }
}