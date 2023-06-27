import module from "./style.module.css";
import { HistoryItem } from "../../typing";

function History(props: HistoryItem) {
  const { title, success } = props;

  return (
    <div className={`${module.container} flex a_center`}>
      <span
        className={`${module.title} ellipsis`}
        title={title}
      >
        {title}
      </span>
      <span className={module.success}>{success ? 1 : 0}</span>
    </div>
  );
}

export default History;