import module from "./style.module.css";
import { PopularItem } from "../../typing";

type PopularProps = PopularItem & {
  handleAsk: (input: string) => void;
}

function Popular(props: PopularProps) {
  const { title, count, handleAsk } = props;

  return (
    <div className={`${module.container} flex a_center`} onClick={() => handleAsk(title)}>
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