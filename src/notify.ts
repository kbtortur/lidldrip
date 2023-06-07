import type { CheckedItem } from "./configure"

import { Bot } from "grammy"
import userConfig from "../config"
import { dateString, readLastMessageID, saveLastMessageID } from "./util"

let overviewMessageID: number | undefined

const bot = new Bot(userConfig.telegramBotToken)
const overviewMessageConfig = {
  parse_mode: "HTML",
  disable_web_page_preview: true,
} as const

const statusEmoji = (status: string): string => {
  if (status.startsWith("online ausverkauft")) return "🔴"
  if (status.startsWith("demnächst bestellbar")) return "🟡"
  if (status.startsWith("lieferbar")) return "🟢"

  return status
}

const deleteLast = async () => {
  try {
    const lastID = await readLastMessageID()
    if (lastID) await bot.api.deleteMessage(userConfig.telegramChatId, lastID)
  } catch {
    // ignore
  }
}

export const updateStatusMessage = async (
  currentCheck?: CheckedItem[],
  resend = false
) => {
  if (overviewMessageID) {
    let overviewMessage = `last check completed ${dateString()}\n`

    if (currentCheck) {
      for (const item of currentCheck) {
        const emoji = statusEmoji(item.status)
        overviewMessage += `\n${emoji} <b><a href="${item.url}">${item.name}</a></b>: ${item.status}`
      }
    }

    console.log(overviewMessage)
    if (resend) {
      await deleteLast()
      const message = await bot.api.sendMessage(
        userConfig.telegramChatId,
        overviewMessage,
        overviewMessageConfig
      )
      overviewMessageID = message.message_id
      await saveLastMessageID(overviewMessageID)
    } else {
      await bot.api.editMessageText(
        userConfig.telegramChatId,
        overviewMessageID,
        overviewMessage,
        overviewMessageConfig
      )
    }
  } else {
    await deleteLast()

    const message = await bot.api.sendMessage(userConfig.telegramChatId, "starting...", {
      disable_notification: true,
    })
    overviewMessageID = message.message_id
    await saveLastMessageID(overviewMessageID)
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
