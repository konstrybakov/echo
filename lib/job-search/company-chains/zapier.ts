import { log } from '../../log.ts'
import { jobsToJSON } from '../llm/jobs-to-json-chain.ts'
import { RSSReader } from '../readers/rss-reader.ts'
import { CompanyData } from '../types.ts'

const COMPANY_NAME = 'Zapier'
const JOBS_URL = 'https://zapier.com/jobs/feeds/latest/'

export const zapierChain = async (): Promise<CompanyData> => {
  try {
    const text = await RSSReader(JOBS_URL)

    const jobs = await jobsToJSON(text)

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
