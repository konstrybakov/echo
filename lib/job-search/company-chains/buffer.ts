import { log } from '../../log.ts'
import { jobsToJSON } from '../llm/jobs-to-json-chain.ts'
import { urlHTMLReader } from '../readers/url-html.ts'
import { htmlToText } from '../transformers/html-to-text.ts'
import { CompanyData } from '../types.ts'

const COMPANY_NAME = 'Buffer'
const JOBS_URL = 'https://embed.homerun.co/pelftkzqkjmhs0h1kzef/widget-en.html'

export const companyChain = async (): Promise<CompanyData> => {
  try {
    const html = await urlHTMLReader(JOBS_URL)
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
