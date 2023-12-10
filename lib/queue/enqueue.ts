import { QueueJob } from '~/queue/types.ts'
import { log } from '~/log.ts'

const kv = await Deno.openKv()

export const enqueue = (job: QueueJob, delay?: number) => {
  log.info(`${new Date().toLocaleTimeString()} || Enqueued job: ${job.data.companyName} ${delay ? `with delay ${delay}` : ''}`)
  log.info(job.id)

  kv.enqueue(job, { delay })
}
