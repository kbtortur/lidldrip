import { Bot } from "grammy"
import userConfig from "../config"

let statusMessageID: number | undefined

const bot = new Bot(userConfig.telegramBotToken)
const specifiedDelayS = userConfig.checkInterval / 1e3

export const updateStatusMessage = async () => {
  if (statusMessageID) {
    const dateString = new Date().toLocaleString()
    const message = `last check at completed at ${dateString}, waiting ${specifiedDelayS}s`

    console.log(message)
    await bot.api.editMessageText(userConfig.telegramChatId, statusMessageID, message)
  } else {
    const message = await bot.api.sendMessage(userConfig.telegramChatId, "starting...", {
      disable_notification: true,
    })
    statusMessageID = message.message_id
  }
}

export const notify = async (message: string) => {
  console.log(message)
  await bot.api.sendMessage(userConfig.telegramChatId, message)
}
