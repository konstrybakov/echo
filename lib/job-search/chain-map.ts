export const companyChainMap = {
  DuckDuckGo: () => import('~/job-search/company-chains/duck-duck-go.ts'),
  // PragmaticEngineer: () => import('~/job-search/company-chains/pragmatic-engineer.ts'),
  Buffer: () => import('~/job-search/company-chains/buffer.ts'),
  Zapier: () => import('~/job-search/company-chains/zapier.ts'),
  // Memorisely: () => import('~/job-search/company-chains/memorisely.ts'),
  // Splice: () => import('~/job-search/company-chains/splice.ts'),
  // OnDeck: () => import('~/job-search/company-chains/on-deck.ts'),
  // Hotjar: () => import('~/job-search/company-chains/hotjar.ts'),
  HelpScout: () => import('~/job-search/company-chains/helpscout.ts'),
  Deno: () => import('~/job-search/company-chains/deno.ts'),
  Fingerprint: () => import('~/job-search/company-chains/fingerprint.ts'),
  // Pitch: () => import('~/job-search/company-chains/pitch.ts'),
  Pipe: () => import('~/job-search/company-chains/pipe.ts'),
  // Loom: () => import('~/job-search/company-chains/loom.ts'),
  // TheBrowserCompany: () => import('~/job-search/company-chains/the-browser-company.ts'),
  // Tines: () => import('~/job-search/company-chains/tines.ts'),
  Honeybadger: () => import('~/job-search/company-chains/honeybadger.ts'),
}

export type CompanyName = keyof typeof companyChainMap

export const companyNames = Object.keys(companyChainMap) as CompanyName[]
export const companyCount = companyNames.length
