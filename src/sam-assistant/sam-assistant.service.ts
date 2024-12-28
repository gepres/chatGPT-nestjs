
import { Injectable } from '@nestjs/common';
import { checkCompleteStatusUseCase, createMessageUseCase, createRuinUseCase, createThreadUseCase, getMessageListUseCase } from './use-cases';
import OpenAI from 'openai';
import { QuestionDto } from './dtos';

@Injectable()
export class SamAssistantService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion( questionDto: QuestionDto) {
    const { threadId, question } = questionDto;
    const message = await createMessageUseCase(this.openai, { threadId, question });
    
    const run = await createRuinUseCase(this.openai, { threadId });

    await checkCompleteStatusUseCase(this.openai, { threadId, runId: run.id });

    const messages = await getMessageListUseCase(this.openai, { threadId });

    return messages.reverse();
  }

}
