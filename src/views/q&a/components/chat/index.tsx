import { useState } from "react";
import module from "./style.module.css";
import { ChatLogItem } from "../../typing";
import SvgIcon from "@c/svg-icon";
import ChatItem from "./components/chatItem";
import ChatInput from "./components/chatInput";
import { calcDateStringValue } from "@u/common";

interface ChatProps {
  logList: ChatLogItem[];
}

function Chat(props: ChatProps) {
  const [showLog, setShowLog] = useState(false);
  const { logList } = props;

  // 点击展示历史日志信息
  const changeShowLog = () => {
    setShowLog(true);
  };

  // 计算是否需要展示时间
  // 当连续两条消息类型一致且时间间隔不超过5秒，就不需要展示时间
  const compareTime = (log: ChatLogItem, index: number): boolean => {
    if (
      index >= 1 && 
      logList[index - 1].type === log.type
    ) {
      return calcDateStringValue(log.createTime, logList[index - 1].createTime) > 5 ? true : false;
    }
    return true;
  };

  return (
    <div className={`flex column gap-row-1 ${module.chat}`}>
      <section className={module.chat__container}>
        {
          logList.length > 0 
            ? <section className={module.log__container}>
              {
                // 先按order排序，然后显示
                showLog 
                  ? logList.sort((a, b) => a.order - b.order).map((log, index) => {
                    return <ChatItem key={log.order + log.createTime} {...log} showTime={compareTime(log, index)}></ChatItem>;
                  })
                  : <p className={module.log__prompt} onClick={changeShowLog}>
                    <SvgIcon name="down" className={module.log__icon}></SvgIcon>
                    <span>是否显示历史日志信息</span>
                  </p>
              }
            </section>
            : ''
        }
      </section>
      <section className={module.chat__input}>
        <ChatInput />
      </section>
    </div>
  );
}

export default Chat;