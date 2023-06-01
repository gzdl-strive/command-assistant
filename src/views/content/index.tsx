import ModelPanel from "@c/modePanel";
import CommonPanel from "@c/commonPanel";
import About from "./components/about";
import globalConfig from "@cfg/global";
import module from "./style.module.css";

const { content: { modePanelList, commonPanelList, about } } = globalConfig;

// 为避免和主入口文件产生歧义，更名为Content
function Content() {
  return (
    <main className={`${module.content} container`}>
      <section className={`${module.section} mode`}>
        <h2 className={module.section__title}>模式面板</h2>
        <h3 className={module.section__subtitle}>各种不同模式</h3>
        <div className={`${module.mode__content} grid gap-col-3 gap-row-3`}>
          {
            modePanelList.length && modePanelList.map(mode => (
              <ModelPanel key={mode.name + mode.type} {...mode} />
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
              <CommonPanel key={common.title + common.type} {...common} />
            ))
          }
        </div>
      </section>
      <section className={`${module.section} about`}>
        <h2 className={module.section__title}>关于我</h2>
        <h3 className={module.section__subtitle}>前端开发工程师</h3>
        <About {...about} />
      </section>
    </main>
  );
}

export default Content;