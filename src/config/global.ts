import { GlobalConfig } from "./typing";
import packageConfig from "../../package.json";

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
    ],
    commonPanelList: [
      {
        title: "Linux",
        type: "Doc",
        icon: "linux"
      },
      {
        title: "Vim",
        type: "Doc",
        icon: "vim-gtk"
      },
      {
        title: "Git",
        type: "Q&A",
        icon: "git"
      },
      {
        title: "JS",
        type: "Q&A",
        icon: "js"
      },
      {
        title: "CSS",
        type: "Doc",
        icon: "css"
      }
    ],
    about: {
      introduction: {
        name: packageConfig.author,
        description: "Web developer, with extensive knowledge and years of experience, working in web technologies, delivering quality work.",
        data: [
          { name: "years of experience", value: "02+" },
          { name: "completed projected", value: "04" },
          { name: "companies worked", value: "01" }
        ]
      },
      experience: [
        {
          title: "Computer Engineer",
          subtitle: "JiLin University of Finance and Economics",
          time: "2017.9-2021.6"
        },
        {
          title: "Web Design",
          subtitle: "self-study",
          time: "2020.3-2020.7"
        },
        {
          title: "Web Development",
          subtitle: "practice",
          time: "2020.7-2021.6"
        },
        {
          title: "Web Development",
          subtitle: "working",
          time: "2021.6-now"
        }
      ],
      portfolio: [
        {
          name: "gzdl-profile",
          time: "2023.04-2023.05",
          description: "This website is suitable for PC screens, built on vite and vue3, and is a small backend project that is ready to use out of the box.",
          address: "http://baidu.com"
        },
        {
          name: "vitv-admin",
          time: "2022-2023",
          description: "This website is suitable for PC screens, built on vite and vue3, and is a small backend project that is ready to use out of the box.",
          address: "http://baidu.com"
        },
        {
          name: "my-single-room",
          time: "2022-2023",
          description: "This website is suitable for PC screens, built on vite and vue3, and is a small backend project that is ready to use out of the box.",
          address: "http://baidu.com"
        }
      ]
    }
  },
  footer: {
    title: "command-assistant",
    subtitle: "retrieval command",
    social: [{ 
      name: "github", 
      url: "https://github.com/gzdl-strive" 
    },
    {
      name: "gitee",
      url: "https://gitee.com/gzdl-strive"
    },
    {
      name: "juejing",
      url: "https://juejing.com"
    }],
    recommend: [{
      name: "gzdlprofile",
      url: "http://124.222.103.60:8890"
    },
    {
      name: "vitv-admin",
      url: "http://124.222.103.60"
    },
    {
      name: "my-single-room",
      url: "http://124.222.103.60:8888"
    }]
  }
};

export default globalConfig;