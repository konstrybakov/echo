import { QueueJob, QueueJobType } from '~/queue/types.ts'
import { companyChainMap } from '~/job-search/chain-map.ts'
import { sendMessage } from '~/echobot/send-message.ts'
import { createJobMessage } from '~/job-search/messaging/create-job-message.ts'
import { log } from '~/log.ts'

export const listenQueue = async () => {
  const kv = await Deno.openKv()

  kv.listenQueue(async (job: unknown) => {
    if (isCheckJobsJob(job)) {
      const status = await kv.get(['job-ids', job.id])

      log.info(
        `${new Date().toLocaleTimeString()} || Received job: ${job.data.companyName} (${
          job.id
        })${status.value ? ' (already processed)' : ''})`
      )

      if (status.value) {
        return
      } else {
        await kv.set(['job-ids', job.id], true)
      }

      const chain = companyChainMap[job.data.companyName]

      const { companyChain } = await chain()
      const jobs = await companyChain()

      await sendMessage(createJobMessage(jobs))
    }
  })
}

const isCheckJobsJob = (job: unknown): job is QueueJob => {
  const { type } = job as QueueJob

  return type === QueueJobType.CheckJob
}
