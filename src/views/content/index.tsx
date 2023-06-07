import { useNavigate } from "react-router-dom";
import ModelPanel from "@c/modePanel";
import CommonPanel from "@c/commonPanel";
import About from "./components/about";
import globalConfig from "@cfg/global";
import typeMapRoute from "@cfg/typeMapRoute";
import module from "./style.module.css";
import { ModePanelMap, CommonPanelMap } from "@cfg/typing";

const { content: { modePanelList, commonPanelList, about } } = globalConfig;

// 为避免和主入口文件产生歧义，更名为Content
function Content() {
  const navigate = useNavigate();

  // 处理模式
  const handleMode = (mode: ModePanelMap) => {
    navigate(typeMapRoute[mode.type] || "/", { 
      state: { 
        describe: mode.describe,
        defaultDir: null
      }
    });
  };

  // 常用功能
  const commonFunc = (common: CommonPanelMap) => {
    const { type, describe, title } = common;
    navigate(typeMapRoute[type] || "/", { 
      state: { 
        describe: describe,
        defaultDir: title
      }
    });
  };

  return (
    <main className={`${module.content} container`}>
      <section className={`${module.section} mode`}>
        <h2 className={module.section__title}>模式面板</h2>
        <h3 className={module.section__subtitle}>各种不同模式</h3>
        <div className={`${module.mode__content} grid gap-col-3 gap-row-3`}>
          {
            modePanelList.length && modePanelList.map(mode => (
              <ModelPanel
                key={mode.name + mode.type}
                {...mode}
                onClick={() => handleMode(mode)}
              />
            ))
          }
        </div>
      </section>
      <section className={`${module.section} common`}>
        <h2 className={module.section__title}>常用功能</h2>
        <h3 className={module.section__subtitle}>便捷添加常用功能</h3>
        <div className={`${module.common__content} grid gap-col-3 gap-row-3`}>
          {
            commonPanelList.length && commonPanelList.map(common => (
              <div key={common.title + common.type} onClick={() => commonFunc(common)}>
                <CommonPanel {...common}/>
              </div>
            ))
          }
        </div>
      </section>
      <section className={`${module.section} about`}>
        <h2 className={module.section__title}>关于我</h2>
        <h3 className={module.section__subtitle}>前端开发工程师</h3>
        <div className={`${module.about__content} flex j_center`}>
          <About {...about} />
        </div>
      </section>
    </main>
  );
}

export default Content;