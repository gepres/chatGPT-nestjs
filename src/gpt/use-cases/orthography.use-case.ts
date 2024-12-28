import OpenAI from "openai";

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;
  // console.log('openAI', openai);
  
  // const response = await openai.chat.completions.create({
  //   messages: [{ role: 'user', content: 'eres un asistente muy util' }],
  //   model: 'gpt-4o-mini'
  // });

  // console.log('response', response);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
          "role": "system", 
          "content": `
            te serán proveídos textos  en español con posibles errores ortográficos y gramaticales,
            las palabras usadas deben de existir en el diccionario de la lengua española,
            debes de responder en formato JSON,
            Tu tarea es corregirlos y retornar información de las solicitudes,
            tambien debes de dar un porcentaje de aciertos para el usuario,
            si no hay errores, debes de retornar un mensaje de felicitaciones.
            ejemplo de salida:
            {
              userScore: number,
              errors: string[] , // ['error -> solucion']
              message: string // usa emojis y texto para felicitar al usuario
            }
          `},
        {"role": "user", "content": prompt}
    ],
    temperature: 0.3,
    max_tokens: 150,
    response_format:{
      type: "json_object",
    }
});

  return completion.choices[0].message.content
}