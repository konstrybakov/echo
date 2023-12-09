/// <reference lib="deno.unstable" />

import 'std/dotenv/load.ts'

import { checkJobs } from './lib/job-search/check-jobs.ts'

Deno.cron('Check jobs', '*/15 * * * *', checkJobs)
