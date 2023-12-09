export enum JobName {
  DuckDuckGo = 'DuckDuckGo',
  PragmaticEngineer = 'Pragmatic Engineer',
  Buffer = 'Buffer',
  Zapier = 'Zapier',
  Memorisely = 'Memorisely'
}

export const jobChainMap = {
  [JobName.DuckDuckGo]: () => import('~/job-search/company-chains/duck-duck-go.ts'),
  [JobName.PragmaticEngineer]: () =>
    import('~/job-search/company-chains/pragmatic-engineer.ts'),
  [JobName.Buffer]: () => import('~/job-search/company-chains/buffer.ts'),
  [JobName.Zapier]: () => import('~/job-search/company-chains/zapier.ts'),
  [JobName.Memorisely]: () => import('~/job-search/company-chains/memorisely.ts')
}
