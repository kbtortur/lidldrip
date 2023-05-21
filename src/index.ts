import { Bot } from "grammy"
import { isSoldOut } from "./check"
import { environment, messageText, wait } from "./util"

const dotenv = environment()

const bot = new Bot(dotenv.TELEGRAM_BOT_TOKEN)

const statusMessage = await bot.api.sendMessage(
  dotenv.TELEGRAM_CHAT_ID,
  "initializing...",
  { disable_notification: true }
)

// eslint-disable-next-line no-constant-condition
while (true) {
  const status = await isSoldOut()

  if (status) {
    await bot.api.editMessageText(
      dotenv.TELEGRAM_CHAT_ID,
      statusMessage.message_id,
      messageText()
    )
  } else {
    await bot.api.deleteMessage(dotenv.TELEGRAM_CHAT_ID, statusMessage.message_id)
    for (let index = 0; index < 4; index++) {
      await bot.api.sendMessage(
        dotenv.TELEGRAM_CHAT_ID,
        `Something happened \n\n${dotenv.TARGET_URL}`
      )
    }

    break
  }

  await wait(Number.parseInt(dotenv.CHECK_INTERVAL_SECONDS) * 1000)
}

export {}
