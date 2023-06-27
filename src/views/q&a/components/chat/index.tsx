import { useState } from "react";
import module from "./style.module.css";
import { ChatLogItem } from "../../typing";
import SvgIcon from "@c/svg-icon";
import ChatItem from "./components/chatItem";

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
              // 先按order排序，然后显示
              showLog 
                ? logList.sort((a, b) => a.order - b.order).map(log => {
                  return <ChatItem key={log.order + log.createTime} {...log}></ChatItem>;
                })
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