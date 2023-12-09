import { launch } from 'astral'

export const pageHTMLReader = async (
  url: string,
  waitForFunction: () => Promise<boolean>,
  parentSelector = 'body'
): Promise<string> => {
  const browser = await launch({
    headless: true
  })

  const page = await browser.newPage()

  await page.goto(url)
  await page.waitForFunction(waitForFunction)

  const pageHTML = await page.evaluate(
    parentSelector => {
      const parent = document.querySelector(parentSelector)

      if (!parent) {
        throw new Error(`Could not find parent element: ${parentSelector}`)
      }

      const tagsToRemove = [
        'script',
        'style',
        'svg',
        'img',
        'iframe',
        'noscript',
        'link',
        'next-route-announcer'
      ]

      tagsToRemove.forEach(tag => {
        const elements = parent.querySelectorAll(tag)

        elements.forEach(element => {
          element.remove()
        })
      })

      parent.querySelectorAll('div').forEach(div => {
        if (div.textContent === '') {
          div.remove()
        }
      })

      return parent.innerHTML
    },
    { args: [parentSelector] }
  )

  await browser.close()

  return pageHTML
}
