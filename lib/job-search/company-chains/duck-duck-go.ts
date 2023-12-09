import N from 'https://esm.sh/v135/base64-js@1.5.1/denonext/base64-js.mjs'
import { log } from '../../log.ts'
import { CompanyData } from '../types.ts'
import { pickProperties } from '../transformers/pick-properties.ts'
import { jobsToJSON } from '../llm/jobs-to-json-chain.ts'

const COMPANY_NAME = 'DuckDuckGo'
const JOBS_URL = 'https://duckduckgo.com/jobs.js'

export const duckDuckGoChain = async (): Promise<CompanyData> => {
  try {
    const json = await fetch(JOBS_URL).then(res => res.json())
    const jobsJSON = pickProperties(json.offers, [
      'careers_url',
      'department',
      'remote',
      'salary',
      'title'
    ])
    const jobs = await jobsToJSON(JSON.stringify(jobsJSON, null, 2))

    return {
      success: true,
      name: COMPANY_NAME,
      ...jobs
    }
  } catch (error) {
    log.error(error)

    const message = error instanceof Error ? error.message : 'Unknown error'

    return {
      success: false,
      name: COMPANY_NAME,
      error: message
    }
  }
}
