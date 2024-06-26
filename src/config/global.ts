import { GlobalConfig } from "./typing";
import packageConfig from "../../package.json";

const globalConfig: GlobalConfig = {
  header: {
    title: "command-assistant",
    subtitle: "used for quick retrieval command",
    theme: "light",
    scrollCritical: 120
  },
  content: {
    modePanelList: [
      {
        name: "文档模式",
        describe: "该模式可便捷查询所需命令(日常开发、学习、工作都用得到)",
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
        name: "GPT问答模式",
        describe: "通过调用ChatGPT来问答，无需自己编写模板",
        type: "GPT",
        icon: "ask-gpt"
      },
      {
        name: "游戏模式",
        describe: "游戏模式->通过游戏形式掌握常用命令",
        type: "Game",
        icon: "game"
      },
    ],
    commonPanelList: [
      {
        title: "Linux",
        describe: "Linux常用命令——用于学习/工作中快速翻阅",
        type: "Doc",
        icon: "linux"
      },
      {
        title: "Vim",
        describe: "Vim基础命令，日常开发使用vim编辑形式，可查看快捷操作",
        type: "Doc",
        icon: "vim-gtk"
      },
      {
        title: "FTP",
        describe: "FTP常用命令，工作中经常使用FTP",
        type: "Doc",
        icon: "FTP"
      },
      {
        title: "Git",
        describe: "Git常用命令以及Flow，自我代码管理，日常提交规范以及检索",
        type: "Doc",
        icon: "git"
      },
      {
        title: "HTML",
        describe: "HTML温习笔记，用于记录常用知识点",
        type: "Doc",
        icon: "html"
      },
      {
        title: "CSS",
        describe: "CSS笔记，对常用样式有个清晰的架构",
        type: "Doc",
        icon: "css"
      },
      {
        title: "JS",
        describe: "JS笔记，对平时可能常用的JS方法进行笔记记录，方便查看",
        type: "Doc",
        icon: "js"
      },
      {
        title: "TypeScript",
        describe: "TS练习",
        type: "Doc",
        icon: "typescript"
      },
      {
        title: "Debug",
        describe: "Chrome Debug、VSCode Debugger调试学习，深入调试",
        type: "Doc",
        icon: "debug"
      },
      {
        title: "NodeJS",
        describe: "NodeJS，用于记录学习Node的知识点",
        type: "Doc",
        icon: "nodejs"
      },
      {
        title: "SHELL",
        describe: "SHELL脚本学习",
        type: "Doc",
        icon: "shell"
      },
      {
        title: "jQuery",
        describe: "jQuery源码阅读",
        type: "Doc",
        icon: "jquery"
      },
      // {
      //   title: "React",
      //   describe: "React笔记",
      //   type: "Doc",
      //   icon: "react"
      // },
      {
        title: "Vue",
        describe: "Vue笔记",
        type: "Doc",
        icon: "vue"
      },
    ],
    about: {
      introduction: {
        name: packageConfig.author,
        description: "Web developer, with extensive knowledge and years of experience, working in web technologies, delivering quality work.",
        data: [
          { name: "years of experience", value: "03+" },
          { name: "completed projected", value: "06+" },
          { name: "companies worked", value: "02" }
        ]
      },
      experience: {
        name: "my experience",
        data: [
          {
            title: "Computer Engineer",
            subtitle: "JiLin University of Finance and Economics",
            time: "2017.09-2021.06"
          },
          {
            title: "Web Development in AsiaInfo",
            subtitle: "self-study & practice & work",
            time: "2020.03-2023.08"
          },
          {
            title: "Business Web Development in COME TO FUTURE TECH",
            subtitle: "work",
            time: "2023.08-2024.05"
          }
        ]
      },
      portfolio: {
        name: "my project",
        data: [
          {
            title: "gd-ui-vite",
            address: "https://gzdl-strive.github.io/gzdl-admin/",
            icon: "https://vitepress.dev/vitepress-logo-mini.svg"
          },
          {
            title: "gzdl-profile",
            address: "http://47.102.210.13/",
            icon: "/vite.svg"
          },
          {
            title: "vitv-admin",
            address: "http://47.102.210.13:8080/",
            icon: "http://47.102.210.13:8090/icons/vitv-admin.svg"
          },
          {
            title: "my-single-room",
            address: "http://47.102.210.13:8088",
            icon: "http://47.102.210.13:8090/icons/my-single-room.svg"
          }
        ]
      },
      plan: {
        target: "重新构建前端知识体系",
        curTarget: "UI组件库项目完善以及各开源项目规范化"
      }
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
      name: "juejin",
      url: "https://juejin.cn/user/1636517801628782"
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