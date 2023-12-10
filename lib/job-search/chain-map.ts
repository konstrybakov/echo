export const companyChainMap = {
  DuckDuckGo: () => import('~/job-search/company-chains/duck-duck-go.ts'),
  PragmaticEngineer: () => import('~/job-search/company-chains/pragmatic-engineer.ts'),
  Buffer: () => import('~/job-search/company-chains/buffer.ts'),
  Zapier: () => import('~/job-search/company-chains/zapier.ts'),
  Memorisely: () => import('~/job-search/company-chains/memorisely.ts'),
  Splice: () => import('~/job-search/company-chains/splice.ts'),
  OnDeck: () => import('~/job-search/company-chains/on-deck.ts')
}

export type CompanyName = keyof typeof companyChainMap

export const companyNames = Object.keys(companyChainMap) as CompanyName[]
export const companyCount = companyNames.length
