import { convert } from 'html-to-text'

export const htmlToText = (html: string, baseUrl?: string): string => {
  return convert(html, {
    selectors: [{ selector: 'a', options: { baseUrl } }]
  })
}
