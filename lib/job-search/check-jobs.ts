import { sendMessage } from '../echobot/send-message.ts'
import { log } from '../log.ts'
import { duckDuckGoChain } from './company-chains/duck-duck-go.ts'
import { bufferChain } from './company-chains/buffer.ts'
import { pragmaticEngineerChain } from './company-chains/pragmatic-engineer.ts'
import { zapierChain } from './company-chains/zapier.ts'
import { createJobMessage } from './messaging/create-job-message.ts'
import { memoriselyChain } from "~/job-search/company-chains/memorisely.ts";

export const checkJobs = async () => {
  log.info('Checking jobs')

  const companies = [
    duckDuckGoChain,
    pragmaticEngineerChain,
    bufferChain,
    zapierChain,
    memoriselyChain
  ]

  for (const company of companies) {
    const job = await company()

    await sendMessage(createJobMessage(job))
  }
}
