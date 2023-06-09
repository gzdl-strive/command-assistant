import SvgIcon from "@c/svg-icon";
import module from "./style.module.css";
import { CommonPanelMap } from "@cfg/typing";

type CommonPanelProps = CommonPanelMap;

function CommonPanel(props: CommonPanelProps) {
  const { title, type, icon } = props;

  return (
    <>
      <div className={`${module.panel__content} flex a_center j_center`}>
        <i className={module.panel__border}></i>
        <i className={module.panel__border}></i>
        <i className={module.panel__border}></i>
        <i className={module.panel__border}></i>
        <SvgIcon name={icon} className={module.panel__icon}></SvgIcon>
      </div>
      <div className={module.panel__title}>{ title }({ type })</div>
    </>
  );
}

export default CommonPanel;