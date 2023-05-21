import { JSDOM } from "jsdom"
import { environment } from "./util"

const dotenv = environment()

export const isSoldOut = async () => {
  try {
    const response = await fetch(dotenv.TARGET_URL)
    const html = await response.text()
    const dom = new JSDOM(html)
    const { document } = dom.window

    const statusElement = document.querySelector(dotenv.TARGET_SOLD_OUT_SELECTOR)
    if (!statusElement) throw new Error("TARGET_SOLD_OUT_SELECTOR is not found")

    const statusText = statusElement.textContent
    if (!statusText) throw new Error("TARGET_SOLD_OUT_TEXT is not found")

    const soldOut = statusText.includes(dotenv.TARGET_SOLD_OUT_TEXT)

    return soldOut
  } catch (error) {
    console.error(error)
    return false
  }
}
