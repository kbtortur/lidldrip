import { defineConfig } from "./src/configure"

export default defineConfig({
  checkInterval: 60e3,
  telegramBotToken: "",
  telegramChatId: "",
  itemList: [
    {
      name: "shirt weiß",
      url: "https://www.lidl.de/p/livergy-lidl-herren-freizeithemd-kurzarm-laessig-weit-geschnitten/p100363881",
      color: "weiß",
      itemSize: "P_GROESSE|M (39/40)",
    },
    {
      name: "tracksuit weiß",
      url: "https://www.lidl.de/p/crivit-lidl-damen-tracksuit-2-tlg-mit-stehkragen/p100363890",
      color: "weiß",
      itemSize: "P_GROESSE|M (40/42)",
    },
    {
      name: "shorts blau",
      url: "https://www.lidl.de/p/livergy-lidl-herren-shorts-mit-baumwolle/p100363838",
      color: "blau",
      itemSize: "P_GROESSE|M (48/50)",
    },
    {
      name: "t-shirt blau",
      url: "https://www.lidl.de/p/livergy-lidl-herren-t-shirt-aus-reiner-baumwolle/p100363851",
      color: "blau",
      itemSize: "P_GROESSE|M (48/50)",
    },
    {
      name: "t-shirt weiß",
      url: "https://www.lidl.de/p/livergy-lidl-herren-t-shirt-aus-reiner-baumwolle/p100363851",
      color: "weiß",
      itemSize: "P_GROESSE|M (48/50)",
    },
    {
      name: "bauchtasche blau",
      url: "https://www.lidl.de/p/lidl-bauchtasche-mit-verstellbarem-gurtband/p100364068",
      color: "blau",
    },
    {
      name: "socken weiß",
      url: "https://www.lidl.de/p/lidl-sportsocken-mit-hohem-baumwollanteil/p100363744",
      color: "weiß",
      itemSize: "P_GROESSE|39-42",
    },
    {
      name: "sonnenbrille schwarz",
      url: "https://www.lidl.de/p/lidl-sonnenbrille-mit-getoenten-glaesern/p100364007",
      color: "schwarz",
    },
  ],
})
