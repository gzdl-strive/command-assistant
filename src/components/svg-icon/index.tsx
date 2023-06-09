import { SvgIconProps } from "./typing";
import "./style.css";

function SvgIcon(props: SvgIconProps) {
  const { name, onClick } = props;
  const className = props.className || '';

  return (
    <svg
      className={["icon", className].join(' ')}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
}

export default SvgIcon;