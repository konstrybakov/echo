import { Bot } from 'grammy'

type Options = {
  format: 'Markdown' | 'MarkdownV2' | 'HTML'
}

const defaultOptions: Options = {
  format: 'MarkdownV2'
}

export const sendMessage = (message: string, { format }: Options = defaultOptions) => {
  const botKey = Deno.env.get('ECHO_UPDATE_BOT_KEY')
  const chatKey = Deno.env.get('ECHO_UPDATE_CHAT_KEY')

  if (!botKey) {
    throw new Error('ECHO_UPDATE_BOT_KEY is not defined')
  }

  if (!chatKey) {
    throw new Error('ECHO_UPDATE_CHAT_KEY is not defined')
  }

  const bot = new Bot(botKey)

  return bot.api.sendMessage(chatKey, message, { parse_mode: format })
}
