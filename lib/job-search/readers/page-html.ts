import { LaunchOptions, launch } from 'astral'
import { cleanHTML } from "~/job-search/readers/util-clean-html.ts";

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

      const cleanParent = cleanHTML(parent)

      return cleanParent.innerHTML
    },
    { args: [parentSelector] }
  )

  await browser.close()

  return pageHTML
}
