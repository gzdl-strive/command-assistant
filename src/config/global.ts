import { GlobalConfig } from "./typing";

const globalConfig: GlobalConfig = {
  header: {
    title: "command-assistant",
    subtitle: "used for quick retrieval command",
    scrollCritical: 120
  },
  content: {
    modePanelList: [
      {
        name: "文档模式",
        describe: "该模式可便捷查询所需命令",
        type: "Doc",
        icon: "document"
      },
      {
        name: "问答模式",
        describe: "问答模式可通过向服务器询问获得结果，无需自行查找.",
        type: "Q&A",
        icon: "ask"
      },
      {
        name: "游戏模式",
        describe: "游戏模式->通过游戏形式掌握常用命令",
        type: "Game",
        icon: "game"
      },
      {
        name: "GPT问答模式",
        describe: "通过调用ChatGPT来问答，无需自己编写模板",
        type: "GPT",
        icon: "ask-gpt"
      }
    ]
  }
};

export default globalConfig;