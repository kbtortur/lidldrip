import type { CheckedItem } from "./configure"

import userConfig from "../config"
import { checkAll } from "./check"
import { wait } from "./util"
import { chromium } from "playwright"
import { notify, updateStatusMessage } from "./notify"

const browser = await chromium.launch()
const context = await browser.newContext()
const page = await context.newPage()

// reject cookies
await page.goto("https://www.lidl.de/c/lidl-kollektion-ab-05-06/a10022513")
await page.getByRole("button", { name: "Ablehnen" }).click({ timeout: 30e3 })
await updateStatusMessage()

let lastCheck: CheckedItem[] = []
try {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const currentCheck = await checkAll(userConfig.itemList, page)

    compare: for (const [index, element] of currentCheck.entries()) {
      if (lastCheck.length !== currentCheck.length) break compare

      if (element.status !== lastCheck[index].status) {
        notify(
          [
            `status changed for ${element.name}`,
            `from ${lastCheck[index].status}`,
            `to ${element.status}`,
          ].join("\n")
        )
      }
    }

    lastCheck = currentCheck

    await updateStatusMessage(currentCheck)
    await wait(userConfig.checkInterval)
  }
} catch (error) {
  console.error(error)

  await browser.close()
}
