import SvgIcon from "@c/svg-icon";
import { GptFuncItem, GptFuncProps } from "./typing";
import module from "./style.module.css";

const gptFuncList: GptFuncItem[] = [
  { key: "001", title: "清除历史", icon: "delete", type: "clear_history" },
  { key: "002", title: "待办功能", icon: "func_add", type: "feature_add" },
  { key: "003", title: "bug修复", icon: "bug", type: "bug_report" }
];

function GptFunc(props: GptFuncProps) {
  const { handleFunc } = props;

  return (
    <div className={`${module.container} flex column j_between`}>
      <div className={`${module.icons} flex column a_center gap-row-2`}>
        <div className={module.icons__bg}></div>
        <img src="/vite.svg" className={module.icons__logo} alt="header big logo" />
        <span className={module.icons__text}>gpt-测试</span>
      </div>
      <div className={`${module.funcList} flex column gap-row-0-5 a_center`}>
        {
          gptFuncList.length && gptFuncList.map(func => {
            return (
              <div className={`${module.func} flex j_center gap-col-1`} key={func.key} onClick={() => handleFunc(func.type)}>
                <SvgIcon name={func.icon} className={module.func__icon}></SvgIcon>
                <span className={module.func__title}>{func.title}</span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default GptFunc;