import { log } from '~/log.ts'
import { jobsToJSON } from '~/job-search/llm/jobs-to-json-chain.ts'
import { RSSReader } from '~/job-search/readers/rss-reader.ts'
import { pickProperties } from '~/job-search/transformers/pick-properties.ts'
import { CompanyData } from '~/job-search/types.ts'

const COMPANY_NAME = 'Zapier'
const JOBS_URL = 'https://zapier.com/jobs/feeds/latest/'

export const zapierChain = async (): Promise<CompanyData> => {
  try {
    const jobsEntries = await RSSReader(JOBS_URL)
    const jobsJson = pickProperties(jobsEntries, ['title', 'links'])
    const jobs = await jobsToJSON(JSON.stringify(jobsJson, null, 2))

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
