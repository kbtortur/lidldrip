import type { CheckedItem } from "./configure"

import { Bot } from "grammy"
import userConfig from "../config"

let statusMessageID: number | undefined

const bot = new Bot(userConfig.telegramBotToken)
const specifiedDelayS = userConfig.checkInterval / 1e3

const statusEmoji = (status: string): string => {
  if (status.startsWith("online ausverkauft")) return "🔴"
  if (status.startsWith("demnächst bestellbar")) return "🟡"
  if (status.startsWith("lieferbar")) return "🟢"

  return status
}

export const updateStatusMessage = async (currentCheck?: CheckedItem[]) => {
  if (statusMessageID) {
    const dateString = new Date().toLocaleString()
    let message = `last check completed ${dateString}, waiting ${specifiedDelayS}s\n\n`

    if (currentCheck) {
      message += "status of items:\n"
      for (const item of currentCheck) {
        const emoji = statusEmoji(item.status)
        message += `\n${emoji} <b>${item.name}</b>: ${item.status}`
      }
    }

    console.log(message)
    await bot.api.editMessageText(userConfig.telegramChatId, statusMessageID, message, {
      parse_mode: "HTML",
    })
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
