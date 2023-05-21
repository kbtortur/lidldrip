import { copyFileSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const wait = (t: number): Promise<void> => new Promise(r => setTimeout(r, t))
export const messageText = () => `Last checked at ${localeTimestamp()}`

export const localeTimestamp = () => {
  const { TIMESTAMP_LOCALE } = environment()
  const formatter = Intl.DateTimeFormat(TIMESTAMP_LOCALE, {
    dateStyle: "medium",
    timeStyle: "medium",
  })

  return formatter.format(new Date())
}

export const ensureDotenv = () => {
  const exists = existsSync(join(__dirname, "../.env"))
  if (!exists) {
    copyFileSync(join(__dirname, "../.env.example"), join(__dirname, "../.env"))
    throw new Error("Please set variables in the .env file and run again")
  }
}

export const environment = () => {
  ensureDotenv()

  const {
    TARGET_SOLD_OUT_SELECTOR,
    TARGET_SOLD_OUT_TEXT,
    TARGET_URL,
    CHECK_INTERVAL_SECONDS,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
    TIMESTAMP_LOCALE,
  } = process.env

  if (!TARGET_URL) throw new Error("TARGET_URL is not set")
  if (!TARGET_SOLD_OUT_SELECTOR) throw new Error("TARGET_SOLD_OUT_SELECTOR is not set")
  if (!TARGET_SOLD_OUT_TEXT) throw new Error("TARGET_SOLD_OUT_TEXT is not set")
  if (!CHECK_INTERVAL_SECONDS) throw new Error("CHECK_INTERVAL_SECONDS is not set")
  if (!TELEGRAM_BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is not set")
  if (!TELEGRAM_CHAT_ID) throw new Error("TELEGRAM_CHAT_ID is not set")
  if (!TIMESTAMP_LOCALE) throw new Error("TIMESTAMP_LOCALE is not set")

  return {
    TARGET_SOLD_OUT_SELECTOR,
    TARGET_SOLD_OUT_TEXT,
    TARGET_URL,
    CHECK_INTERVAL_SECONDS,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
    TIMESTAMP_LOCALE,
  }
}
