import "./style.css";
import { ModePanelMap } from '@cfg/typing';

function ModelPanel(props: ModePanelMap) {
  const { name, describe, type, icon } = props;
  return (
    <section className="panel">
      <h2 className="panel__title">{name}</h2>
      <h3 className="panel__subtitle ellipsis">{describe}</h3>
      <div className="panel__decoration flex j_between a_end">
        <svg className="icon panel__icon" aria-hidden="true">
          <use xlinkHref={`#icon-${icon}`}></use>
        </svg>
        <p className="panel__type">{type}</p>
      </div>
    </section>
  );
}

export default ModelPanel;