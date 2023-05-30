import globalConfig from '@cfg/global';
import ModelPanel from './components/modePanel';
import "./style.css";

const { content: { modePanelList } } = globalConfig;

// 为避免和主入口文件产生歧义，更名为Content
function Content() {
  return (
    <main className="content">
      <section className="section mode">
        <h2 className="section__title">模式面板</h2>
        <h3 className="section__subtitle">各种不同模式</h3>
        <div className="mode__content grid gap-col-3 gap-row-3">
          {
            modePanelList.length && modePanelList.map(mode => {
              return <ModelPanel key={mode.type} {...mode} />;
            })
          }
        </div>
      </section>
      <section className="section common">
        <h2 className="section__title">常用功能</h2>
        <h3 className="section__subtitle">便捷添加常用功能</h3>
      </section>
      <section className="section about">
        <h2 className="section__title">关于我</h2>
        <h3 className="section__subtitle">前端开发工程师</h3>
      </section>
    </main>
  );
}

export default Content;