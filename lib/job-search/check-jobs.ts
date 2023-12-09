import { sendMessage } from '../echobot/send-message.ts'
import { log } from '../log.ts'
import { bufferChain } from './company-chains/buffer.ts'
import { pragmaticEngineerChain } from './company-chains/pragmatic-engineer.ts'
import { zapierChain } from './company-chains/zapier.ts'
import { createJobMessage } from './messaging/create-job-message.ts'

export const checkJobs = async () => {
  log.info('Checking jobs')

  const companies = [pragmaticEngineerChain, bufferChain, zapierChain]

  const jobs = await Promise.all(companies.map(company => company()))

  for (const job of jobs) {
    await sendMessage(createJobMessage(job))
  }
}
