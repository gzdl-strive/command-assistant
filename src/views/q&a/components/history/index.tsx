import SvgIcon from "@c/svg-icon";
import { HistoryItem } from "../../typing";
import module from "./style.module.css";

type HsitoryProps = HistoryItem & {
  handleAsk: (input: string) => void;
}

function History(props: HsitoryProps) {
  const { title, success, handleAsk } = props;

  return (
    <div className={`${module.container} flex a_center`} onClick={() => handleAsk(title)}>
      <span
        className={`${module.title} ellipsis`}
        title={title}
      >
        {title}
      </span>
      <SvgIcon name={success ? "status-success" : "status-error"} className={module.success}></SvgIcon>
    </div>
  );
}

export default History;