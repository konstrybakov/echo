import { CompanyData } from '~/job-search/types.ts'
import { log } from '~/log.ts'
import { jobsToJSON } from '~/job-search/llm/jobs-to-json-chain.ts'
import { pageHTMLReader } from '~/job-search/readers/page-html.ts'
import { htmlToText } from '~/job-search/transformers/html-to-text.ts'

const COMPANY_NAME = 'Deno'
const BASE_URL = 'https://jobs.ashbyhq.com'
const JOBS_URL = 'https://jobs.ashbyhq.com/Deno'

export const companyChain = async (): Promise<CompanyData> => {
  try {
    const html = await pageHTMLReader(JOBS_URL, () => {
      const heading = document.querySelector('h1.ashby-job-board-heading')

      return Promise.resolve(Boolean(heading))
    })

    if (!html) {
      return {
        success: false,
        name: COMPANY_NAME,
        error: 'Could not extract HTML from page'
      }
    }

    const jobsText = htmlToText(html, BASE_URL)
    const jobs = await jobsToJSON(jobsText)

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
