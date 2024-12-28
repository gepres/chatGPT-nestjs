import OpenAI from "openai";

interface Options {
  threadId: string;
  question: string;
}

export const createMessageUseCase = async (openai: OpenAI, options: Options) => {

  const { threadId, question } = options;

  const message = await openai.beta.threads.messages.create(
    threadId,
    {
      "role": "user",
      "content": question
    }
  );


  // console.log('message', message);
  

  return message;

}