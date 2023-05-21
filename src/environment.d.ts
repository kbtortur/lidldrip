// type process.env
declare namespace NodeJS {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  interface ProcessEnv {
    TARGET_URL?: string
    TARGET_SOLD_OUT_SELECTOR?: string
    TARGET_SOLD_OUT_TEXT?: string
  }
}
