import { Job } from '../types.ts'

const FILTER = [
  'manager',
  'designer',
  'backend',
  'representative',
  'writer',
  'scientist',
  'general interest form',
  'director',
  'specialist'
]

export const filterJobs = (jobs: Job[]): Job[] => {
  return jobs.filter(
    job =>
      job.title &&
      !FILTER.some(filter => job.title.toLowerCase().includes(filter.toLowerCase()))
  )
}
