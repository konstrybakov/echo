import { ulid } from 'ulid'

import { companyCount, companyNames } from '~/job-search/chain-map.ts'
import { enqueue } from '~/queue/enqueue.ts'
import { QueueJobType } from '~/queue/types.ts'

const HOUR = 1000 * 60 * 60

export const checkJobs = (companies?: string[]) => {
  const delay = HOUR / 4 / companyCount
  let index = 0

  const companiesToCheck = companies
    ? companyNames.filter(company => companies.includes(company.toLowerCase()))
    : companyNames

  for (const company of companiesToCheck) {
    enqueue(
      {
        id: ulid(),
        type: QueueJobType.CheckJob,
        data: {
          companyName: company
        }
      },
      delay * index
    )

    index++
  }
}
