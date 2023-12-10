import { CompanyName } from '~/job-search/chain-map.ts'

export type QueueJob = {
  id: string
  type: QueueJobType
  data: {
    companyName: CompanyName
  }
}

export enum QueueJobType {
  CheckJob = 'CheckJob'
}
