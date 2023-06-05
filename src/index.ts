import type { CheckedItem } from "./configure"

import userConfig from "../config"
import { checkAll } from "./check"
import { wait } from "./util"
import { chromium } from "playwright"

const browser = await chromium.launch({ headless: false })
const context = await browser.newContext()
const page = await context.newPage()

// reject cookies
await page.goto("https://www.lidl.de/c/lidl-kollektion-ab-05-06/a10022513")
await page.getByRole("button", { name: "Ablehnen" }).click({ timeout: 1e3 })

let lastCheck: CheckedItem[] = []
try {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const checked = await checkAll(userConfig, page)

    compare: for (const [index, element] of checked.entries()) {
      if (lastCheck.length !== checked.length) break compare

      if (element.status !== lastCheck[index].status) {
        console.log(
          [
            `status changed for ${element.name}`,
            `from ${lastCheck[index].status}`,
            `to ${element.status}`,
          ].join("\n")
        )
      }
    }

    lastCheck = checked

    console.log(`last check at completed at ${new Date().toLocaleString()}, waiting 30s`)
    await wait(30e3)
  }
} catch (error) {
  console.error(error)

  await browser.close()
}
