import { log } from '~/log.ts'
import { urlHTMLReader } from '~/job-search/readers/url-html.ts'
import { CompanyData } from "~/job-search/types.ts"
import { htmlToText } from "~/job-search/transformers/html-to-text.ts";
import { jobsToJSON } from "~/job-search/llm/jobs-to-json-chain.ts";

const COMPANY_NAME = 'Memorisely'
const JOBS_URL = 'https://www.memorisely.com/our-story'

export const companyChain = async (): Promise<CompanyData> => {
  try {
    const html = await urlHTMLReader(JOBS_URL, 'div.job-options')
    const jobsText = htmlToText(html)
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
