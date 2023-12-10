/// <reference lib="deno.unstable" />

import 'std/dotenv/load.ts'

import { checkJobs } from './lib/job-search/check-jobs.ts'
import { listenQueue } from '~/queue/listen.ts'

const mode = Deno.env.get('MODE')

await listenQueue()

if (mode === 'server') {
  Deno.serve(async () => {
    await checkJobs()

    return new Response('Hello world')
  })
}

if (mode === 'cron') {
  Deno.cron('Check jobs', '0 10 * * *', checkJobs)
}
