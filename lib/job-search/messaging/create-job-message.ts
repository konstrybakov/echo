import { CompanyData } from '../types.ts'
import { filterJobs } from './filter-jobs.ts'
import { sanitize } from './sanitize.ts'

export const createJobMessage = (companyData: CompanyData): string => {
  const message = [`Jobs at *${companyData.name}:*`, '']

  if (!companyData.success) {
    message.push(sanitize(`Error: ${companyData.error}`))
    message.push('')

    return message.join('\n')
  }

  if (!companyData.jobs.length) {
    message.push('No jobs')
    message.push('')

    return message.join('\n')
  }

  const filteredJobs = filterJobs(companyData.jobs)

  const sortedByFitJobs = filteredJobs.toSorted((a, b) => {
    if (a.isFitForMe && !b.isFitForMe) {
      return -1
    }

    if (!a.isFitForMe && b.isFitForMe) {
      return 1
    }

    return 0
  })

  for (const job of sortedByFitJobs) {
    const title = sanitize(job.title)

    const markedTitle = job.isFitForMe ? `💥 ${title}` : title

    if (!job.url) {
      message.push(`${markedTitle}`)
    } else {
      message.push(`[${markedTitle}](${job.url})`)
    }

    if (job.company) {
      message.push(`${sanitize(`Company: ${job.company}`)}`)
    }

    if (job.description) {
      message.push(sanitize(job.description))
    }

    if (job.location) {
      message.push(sanitize(`Location: ${job.location}`))
    }

    if (job.salary) {
      message.push(sanitize(`Salary: ${job.salary}`))
    }

    message.push('')
  }

  return message.join('\n')
}
