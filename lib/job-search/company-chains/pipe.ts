import { log } from '~/log.ts'
import { jobsToJSON } from '~/job-search/llm/jobs-to-json-chain.ts'
import { pickProperties } from '~/job-search/transformers/pick-properties.ts'
import { CompanyData } from '~/job-search/types.ts'

const COMPANY_NAME = 'Pipe'
const JOBS_URL = 'https://boards-api.greenhouse.io/v1/boards/pipetechnologies/jobs'

export const companyChain = async (): Promise<CompanyData> => {
  try {
    const json = await fetch(JOBS_URL).then(res => res.json())
    const jobsJSON = pickProperties(json.jobs, [
      'absolute_url',
      'location',
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
