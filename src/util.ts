import { readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const LAST_MESSAGE_ID_LOCATION = join(__dirname, "../lastMessageID.local")

export const wait = (t: number): Promise<void> => new Promise(r => setTimeout(r, t))

export const saveLastMessageID = async (messageID: number) => {
  await writeFile(LAST_MESSAGE_ID_LOCATION, messageID.toString())
}

export const readLastMessageID = async (): Promise<number | undefined> => {
  try {
    const buffer = await readFile(LAST_MESSAGE_ID_LOCATION)
    const messageID = Number.parseInt(buffer.toString())

    return messageID
  } catch {
    return undefined
  }
}
