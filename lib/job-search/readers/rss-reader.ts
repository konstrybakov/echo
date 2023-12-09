import { parseFeed } from 'rss'

export const RSSReader = async (url: string): Promise<string> => {
  const response = await fetch(url)
  const text = await response.text()
  const feed = await parseFeed(text)

  return JSON.stringify(feed, null, 2)
}
