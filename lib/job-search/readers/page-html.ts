import { LaunchOptions, launch } from 'astral'

export const pageHTMLReader = async (
  url: string,
  waitForFunction: () => Promise<boolean>,
  parentSelector = 'body'
): Promise<string> => {
  const useBrowserless = Deno.env.get('BROWSERLESS_MODE') === 'true'

  const options: LaunchOptions = useBrowserless
    ? {
        wsEndpoint: `wss://chrome.browserless.io?token=${Deno.env.get(
          'BROWSERLESS_API_KEY'
        )}`
      }
    : {
        headless: true
      }

  const browser = await launch(options)

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
