import { ulid } from 'ulid'

import { companyCount, companyNames } from '~/job-search/chain-map.ts'
import { enqueue } from '~/queue/enqueue.ts'
import { QueueJobType } from '~/queue/types.ts'

const HOUR = 1000 * 60 * 10

export const checkJobs = () => {
  const delay = HOUR / companyCount
  let index = 0

  for (const company of companyNames) {
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
