import "./style.css";
import { ModePanelMap } from '@cfg/typing';

function ModelPanel(props: ModePanelMap) {
  const { name, describe, type } = props;
  return (
    <section className="panel">
      <h2 className="panel__title">{ name }</h2>
      <h3 className="panel__subtitle ellipsis">{ describe }</h3>
      <i className="iconfont icon-document panel__icon"></i>
      <p className="panel__type">{ type }</p>
    </section>
  );
}

export default ModelPanel;