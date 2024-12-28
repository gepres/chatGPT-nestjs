import OpenAI from "openai";

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRuinUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistantId = 'asst_uald1SUlh1fzSTvCYljXCNHv' } = options;

  // console.log({threadId, assistantId});
  
  const run = await openai.beta.threads.runs.create(threadId,{
    assistant_id: assistantId,
    // instructions // OJO!! sobre escribe el asistente.
  })

  console.log('run', run);


  return run
  
  
}