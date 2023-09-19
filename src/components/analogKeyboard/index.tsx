import module from "./style.module.css";

interface AnalogType {
  name: string;
  onClick?: () => void;
}

function AnalogKeyboard(props: AnalogType) {
  const { name, onClick } = props;

  return (
    <span className={`${module.wrapper}`} onClick={onClick}>
      <i className={`${module.name}`}>{name}</i>
    </span>
  );
}

export default AnalogKeyboard;