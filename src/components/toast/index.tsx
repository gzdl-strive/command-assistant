import SvgIcon from "@c/svg-icon";
import module from "./style.module.css";

interface ToastProps {
  message: string;
  msgType?: "success" | "warning" | "error";
}

const Toast = (props: ToastProps) => {
  const { message, msgType } = props;

  return (
    <div className={`${module.container} flex a_center gap-col-1`}>
      <SvgIcon name={`status-${msgType}`} className={module.icon}></SvgIcon>
      <span className={module.message}>{message}</span>
    </div>
  );
};

export default Toast;