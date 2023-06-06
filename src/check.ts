import type { CheckedItem, ToCheckItem } from "./configure"
import type { Page } from "playwright"

const checkItem = async (item: ToCheckItem, page: Page) => {
  await page.goto(item.url)

  await page.locator(`label:has([title='${item.color}'])`).click()
  if (item.itemSize) {
    await page.getByLabel(/Größe(?: wählen)?:/).selectOption(item.itemSize)
  }

  const status = await page.locator(".buybox__item .badge-wrapper").textContent()
  if (!status) throw new Error(`status not found for ${item.name}`)

  return status.trim().toLowerCase()
}

export const checkAll = async (
  itemList: ToCheckItem[],
  page: Page
): Promise<CheckedItem[]> => {
  const checkedItems: CheckedItem[] = []
  for (const item of itemList) {
    const checkedItem = { ...item, status: await checkItem(item, page) }
    checkedItems.push(checkedItem)
  }

  return checkedItems
}
