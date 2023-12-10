import { pageHTMLReader } from '../readers/page-html.ts'
import { jobsToJSON } from '../llm/jobs-to-json-chain.ts'
import { htmlToText } from '../transformers/html-to-text.ts'
import { CompanyData } from '../types.ts'
import { log } from '../../log.ts'

const COMPANY_NAME = 'Pragmatic Engineer'
const BASE_URL = 'https://pragmatic-engineer.pallet.com'
const JOBS_URL = `${BASE_URL}/jobs`

export const companyChain = async (): Promise<CompanyData> => {
  try {
    const html = await pageHTMLReader(JOBS_URL, () => {
      const divs = document.querySelectorAll('div')

      let found = false

      divs.forEach(div => {
        if (div.textContent?.toLowerCase().includes('all jobs')) {
          found = true
        }
      })

      return Promise.resolve(found)
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
