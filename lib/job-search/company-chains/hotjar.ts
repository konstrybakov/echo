import { log } from '~/log.ts'
import { CompanyData } from '~/job-search/types.ts'
import { jobsToJSON } from '~/job-search/llm/jobs-to-json-chain.ts'

const COMPANY_NAME = 'Hotjar'
const JOBS_URL = 'https://boards-api.greenhouse.io/v1/boards/hotjar/jobs?content=true'

export const companyChain = async (): Promise<CompanyData> => {
  try {
    const json = await fetch(JOBS_URL).then(res => res.json())
    const jobs = await jobsToJSON(JSON.stringify(json, null, 2))

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
