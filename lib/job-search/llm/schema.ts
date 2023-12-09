import { z } from 'zod'

export const jobSchema = z.object({
  title: z.string().describe("The job's title"),
  description: z
    .string()
    .optional()
    .describe("A short description of the job's responsibilities"),
  location: z.string().optional().describe('The location of the job, if any'),
  isRemote: z.boolean().optional().describe('Whether the job is remote or not'),
  url: z.string().url().describe('The URL of the job posting'),
  salary: z.string().optional().describe('The salary of the job, if any'),
  company: z.string().describe('The company that is hiring'),
  isFitForMe: z.boolean().describe('Whether the job is fit for me or not'),
  reasonNotFitForMe: z.string().describe('The reason why the job is not fit for me')
})

export const jobCollectionSchema = z.object({
  jobs: z.array(jobSchema).describe('The list of jobs')
})
