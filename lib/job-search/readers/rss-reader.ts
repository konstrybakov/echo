import { parseFeed } from 'rss'

export const RSSReader = async (url: string): Promise<Record<string, unknown>[]> => {
  const response = await fetch(url)
  const text = await response.text()
  const feed = await parseFeed(text)

  return feed.entries as unknown as Record<string, unknown>[]
}
