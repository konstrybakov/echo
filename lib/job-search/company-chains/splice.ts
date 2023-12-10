import { log } from "~/log.ts";
import { jobsToJSON } from "~/job-search/llm/jobs-to-json-chain.ts";
import { urlHTMLReader } from "~/job-search/readers/url-html.ts";
import { htmlToText } from "~/job-search/transformers/html-to-text.ts";
import { CompanyData } from "~/job-search/types.ts";

const COMPANY_NAME = 'Splice'
const BASE_URL = 'https://boards.greenhouse.io'
const JOBS_URL = 'https://boards.greenhouse.io/splice'

export const spliceChain = async (): Promise<CompanyData> => {
  try {
    const html = await urlHTMLReader(JOBS_URL, 'div#main')
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
