/// <reference lib="deno.unstable" />

import 'std/dotenv/load.ts'

import { checkJobs } from './lib/job-search/check-jobs.ts'

const mode = Deno.env.get('MODE')

if (mode === 'server') {
  Deno.serve(async () => {
    await checkJobs()

    return new Response('Hello world')
  })
}

if (mode === 'cron') {
  Deno.cron('Check jobs', '0 10 * * *', checkJobs)
}
