import { JSDOM } from "jsdom"
import { ensureDotenv } from "./util"

ensureDotenv()

const { TARGET_SOLD_OUT_SELECTOR, TARGET_SOLD_OUT_TEXT, TARGET_URL } = process.env

if (!TARGET_URL) throw new Error("TARGET_URL is not set")
if (!TARGET_SOLD_OUT_SELECTOR) throw new Error("TARGET_SOLD_OUT_SELECTOR is not set")
if (!TARGET_SOLD_OUT_TEXT) throw new Error("TARGET_SOLD_OUT_TEXT is not set")

const isSoldOut = async () => {
  try {
    const response = await fetch(TARGET_URL)
    const html = await response.text()
    const dom = new JSDOM(html)

    const statusElement = dom.window.document.querySelector(TARGET_SOLD_OUT_SELECTOR)
    if (!statusElement) throw new Error("TARGET_SOLD_OUT_SELECTOR is not found")

    const statusText = statusElement.textContent
    if (!statusText) throw new Error("TARGET_SOLD_OUT_TEXT is not found")

    const soldOut = statusText.includes(TARGET_SOLD_OUT_TEXT)

    return soldOut
  } catch (error) {
    console.error(error)
    return false
  }
}

console.log(await isSoldOut())

export {}
