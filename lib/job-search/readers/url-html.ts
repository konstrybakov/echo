import { DOMParser } from 'deno-dom'
import { cleanHTML } from "~/job-search/readers/util-clean-html.ts";

export const urlHTMLReader = async (
  url: string,
  selector?: string | ((doc: Document) => Element | null)
): Promise<string> => {
  const text = await fetch(url).then(res => res.text())

  if (!selector) {
    return text
  }

  const domParser = new DOMParser()
  const html = domParser.parseFromString(text, 'text/html') as Document | null

  if (!html) {
    throw new Error('Could not parse HTML')
  }

  let element: Element | null

  if (typeof selector === 'function') {
    element = selector(html)
  } else {
    element = html.querySelector(selector)
  }

  if (!element) {
    throw new Error(`Could not find element with selector: ${selector}`)
  }

  const cleanElement = cleanHTML(element)

  return cleanElement.innerHTML
}
