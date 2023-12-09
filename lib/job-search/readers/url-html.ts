import { DOMParser } from 'deno-dom'

export const urlHTMLReader = async (url: string, selector: string): Promise<string> => {
  const text = await fetch(url).then(res => res.text())

  if (!selector) {
    return text
  }

  const domParser = new DOMParser()
  const html = domParser.parseFromString(text, 'text/html')

  if (!html) {
    throw new Error('Could not parse HTML')
  }

  const element = html.querySelector(selector)

  if (!element) {
    throw new Error(`Could not find element with selector: ${selector}`)
  }

  return element.innerHTML
}
