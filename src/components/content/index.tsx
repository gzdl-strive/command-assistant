import globalConfig from '@cfg/global';
import ModelPanel from './components/modePanel';
import "./style.css";

const { content: { modePanelList } } = globalConfig;

// 为避免和主入口文件产生歧义，更名为Content
function Content() {
  return (
    <main className="content">
      <section className="section mode grid gap-col-1 gap-row-3">
        {
          modePanelList.length && modePanelList.map(mode => {
            return <ModelPanel key={mode.type} {...mode} />;
          })
        }
      </section>
      <section className="section contact">
        <h2>Contact Me</h2>
        <h3>xxxxxxxxxxx</h3>
      </section>
    </main>
  );
}

export default Content;