import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate
} from 'langchain/prompts'

export const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
  `List all jobs mentioned in the text version of the following job posting page.
  I will always include all jobs I find in text.
  When I am parsing the page, I make sure to pay attention to the JOB - URL pairing. The text might have misleading whitespace and newlines, so I will analyze the text carefully.
  To decide whether the job is fit for me or not, I will use the following criteria:
  The job has to be related to frontend engineering: frontend engineer is perfect match, but product engineer etc are also fine. This is the most important criteria. If the title is not related to frontend engineering, the job is not fit for me.
  Examples of jobs not fit for me: Backend related, Manager related, Data scientist related, Data engineer related.
  Examples of jobs fit for me: Frontend engineer, Product Engineer, Fullstack engineer, Software engineer, Software developer.
  The job has to be remote, with possibility to work from Europe, or timezone close to Europe. If the job is not remote, the job is not fit for me. If the jobs is remote, but only for US, it is not fit for me.
  The salary is preferably > USD 130k or > GBP 105k or > EUR 110k`
)

export const userPrompt = HumanMessagePromptTemplate.fromTemplate('{jobs}')
