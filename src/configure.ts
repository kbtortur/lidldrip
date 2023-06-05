export type ToCheckItem = {
  name: string
  url: string
  color: string
  itemSize?: string
}

export type CheckedItem = ToCheckItem & {
  status: string
}

export type Config = {
  checkInterval: number
  telegramBotToken: string
  telegramChatId: string
  itemList: ToCheckItem[]
}

export const defineConfig = (config: Config) => config
