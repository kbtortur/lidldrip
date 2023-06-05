export type ToCheckItem = {
  name: string
  url: string
  color: string
  itemSize?: string
}

export type CheckedItem = ToCheckItem & {
  status: string
}

export const defineConfig = (itemList: ToCheckItem[]) => itemList
