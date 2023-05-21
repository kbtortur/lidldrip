import { copyFileSync, existsSync } from "node:fs"

import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const ensureDotenv = () => {
  const exists = existsSync(join(__dirname, "../.env"))
  if (!exists) {
    copyFileSync(join(__dirname, "../.env.example"), join(__dirname, "../.env"))
    throw new Error("Please set variables in the .env file and run again")
  }
}
