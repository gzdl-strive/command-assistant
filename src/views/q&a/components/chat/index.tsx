import { useState } from "react";
import module from "./style.module.css";
import { ChatLogItem } from "../../typing";
import SvgIcon from "@c/svg-icon";

interface ChatProps {
  logList: ChatLogItem[];
}

function Chat(props: ChatProps) {
  const [showLog, setShowLog] = useState(false);
  const { logList } = props;

  const changeShowLog = () => {
    setShowLog(true);
  };

  return (
    <>
      {
        logList.length > 0 
          ? <section className={module.log__container}>
            {
              showLog ? <span>6666</span>
                : <p className={module.log__prompt} onClick={changeShowLog}>
                  <SvgIcon name="down" className={module.log__icon}></SvgIcon>
                  <span>是否显示历史日志信息</span>
                </p>
            }
          </section>
          : ''
      }
    </>
  );
}

export default Chat;