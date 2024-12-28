import OpenAI from "openai";

interface Options {
  prompt: string;
  lang: string;
}


export const translateUseCase = async (openai:OpenAI, options: Options) => {
  const { prompt, lang } = options;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        "role": "system",
        "content": `
           Traduce el siguiente texto al idioma ${lang}:${ prompt }
          `},
      // { "role": "user", "content": prompt }
    ],
    temperature: 0.2,
  });

  return {
    message: completion.choices[0].message.content
  }
}