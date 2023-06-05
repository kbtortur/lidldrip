import type { CheckedItem } from "./configure"

import { Bot } from "grammy"
import userConfig from "../config"
import { readLastMessageID, saveLastMessageID } from "./util"

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
    try {
      const lastID = await readLastMessageID()
      if (lastID) await bot.api.deleteMessage(userConfig.telegramChatId, lastID)
    } catch {
      // ignore
    }

    const message = await bot.api.sendMessage(userConfig.telegramChatId, "starting...", {
      disable_notification: true,
    })
    statusMessageID = message.message_id
    await saveLastMessageID(statusMessageID)
  }
}

export const notify = async (previous: CheckedItem, current: CheckedItem) => {
  const message = [
    `status changed for <b>${current.name}</b>`,
    `from ${statusEmoji(previous.status)} ${previous.status}`,
    `to ${statusEmoji(current.status)} ${current.status}`,
  ].join("\n")

  console.log(message)
  await bot.api.sendMessage(userConfig.telegramChatId, message, { parse_mode: "HTML" })
}
