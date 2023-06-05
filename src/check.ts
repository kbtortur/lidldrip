import type { ToCheckItem } from "./configure"
import type { Page } from "playwright"

import { chromium } from "playwright"

let rejectedCookies = false
const checkItem = async (item: ToCheckItem, page: Page) => {
  await page.goto(item.url)

  if (!rejectedCookies) {
    await page.getByRole("button", { name: "Ablehnen" }).click({ timeout: 1e3 })
    rejectedCookies = true
  }

  await page.locator(`label:has([title='${item.color}'])`).click()
  if (item.itemSize) {
    await page.getByLabel(/Größe(?: wählen)?:/).selectOption(item.itemSize)
  }

  const status = await page.locator(".buybox__item .badge-wrapper").textContent()
  console.log(`${item.name}: ${status}`)
}

export const check = async (itemList: ToCheckItem[]) => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  for (const item of itemList) {
    await checkItem(item, page)
  }

  await browser.close()
}
