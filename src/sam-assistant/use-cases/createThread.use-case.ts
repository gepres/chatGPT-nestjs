import OpenAI from "openai";




export const createThreadUseCase = async (openai: OpenAI) => {
  try {
    console.log('createThreadUseCase');
    
    const {id} = await openai.beta.threads.create();
    // console.log('id', id);
    
    return {id};

  } catch (error) {
    console.error('Error al crear el hilo:', error);
  }
  
}