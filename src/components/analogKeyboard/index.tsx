import module from "./style.module.css";

interface AnalogType {
  name: string;
}

function AnalogKeyboard(props: AnalogType) {
  const { name } = props;

  return (
    <span className={module.wrapper}>
      <i className={module.name}>{name}</i>
    </span>
  );
}

export default AnalogKeyboard;