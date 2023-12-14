import { zodToJsonSchema } from 'zod-to-json-schema'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import { ChatPromptTemplate } from 'langchain/prompts'

import { systemPrompt, userPrompt } from './prompts.ts'
import { jobCollectionSchema } from './schema.ts'
import { JobCollection } from '../types.ts'

const prompt = new ChatPromptTemplate({
  promptMessages: [systemPrompt, userPrompt],
  inputVariables: ['jobs']
})

const llm = new ChatOpenAI({
  // modelName: 'gpt-4-1106-preview',
  modelName: 'gpt-3.5-turbo-1106',
  temperature: 0,
  openAIApiKey: Deno.env.get('OPENAI_API_KEY')
})

const functionCallingModel = llm.bind({
  functions: [
    {
      name: 'output_formatter',
      description: 'Should always be used to properly format output',
      parameters: zodToJsonSchema(jobCollectionSchema)
    }
  ],
  function_call: { name: 'output_formatter' }
})

const outputParser = new JsonOutputFunctionsParser()

const jobsToJSONChain = prompt.pipe(functionCallingModel).pipe(outputParser)

export const jobsToJSON = (jobs: string): Promise<JobCollection> =>
  jobsToJSONChain.invoke({ jobs }) as Promise<JobCollection>
