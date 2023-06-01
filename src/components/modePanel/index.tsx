import SvgIcon from "@c/svg-icon";
import module from "./style.module.css";
import { ModePanelMap } from '@cfg/typing';

function ModelPanel(props: ModePanelMap) {
  const { name, describe, type, icon } = props;
  return (
    <section className={module.panel}>
      <h2 className={module.panel__title}>{name}</h2>
      <h3 className={module.panel__subtitle}>{describe}</h3>
      <div className={`${module.panel__decoration} flex j_between a_end`}>
        <SvgIcon name={icon || "default"} className={module.panel__icon}></SvgIcon>
        <p className={module.panel__type}>{type}</p>
      </div>
    </section>
  );
}

export default ModelPanel;