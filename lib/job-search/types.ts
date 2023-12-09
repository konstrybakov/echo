import { z } from 'zod'
import { jobSchema, jobCollectionSchema } from './llm/schema.ts'

export type Job = z.infer<typeof jobSchema>
export type JobCollection = z.infer<typeof jobCollectionSchema>
export type CompanyData =
  | ({
      success: true
      name: string
    } & JobCollection)
  | {
      success: false
      name: string
      error: string
    }
