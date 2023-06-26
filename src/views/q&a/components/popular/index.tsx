import module from "./style.module.css";
import { PopularItem } from "../../typing";

function Popular(props: PopularItem) {
  const { title, count } = props;

  return (
    <div className={`${module.container} flex a_center`}>
      <span
        className={`${module.title} ellipsis`}
        title={title}
      >
        {title}
      </span>
      <span className={module.count}>{count}</span>
    </div>
  );
}

export default Popular;