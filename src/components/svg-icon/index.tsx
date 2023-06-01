import { SvgIconProps } from "./typing";
import "./style.css";

function SvgIcon(props: SvgIconProps) {
  const { name } = props;
  const className = props.className || '';

  return (
    <svg className={["icon", className].join(' ')} aria-hidden="true">
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
}

export default SvgIcon;