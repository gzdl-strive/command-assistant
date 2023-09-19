import { useRef, useEffect, useState } from "react";
import useStateCallback from "@h/useStateCallback";
import useToast from "@h/useToast";
import QuickAction from "./components/quickAction";
import ChatLog from "./components/chatLog";
import ChatInput from "./components/chatInput";
import Toast from "@c/toast";
import Scroll from "@u/scroll";
import { getCurrentDateTimeString, calcDateStringValue } from "@u/common";
import { ChatLogItem } from "./typing";
import module from "./style.module.css";

type GptChatComType = {
  clear: boolean;
  resetClearFlag: () => void;
}

function GptChatCom(props: GptChatComType) {
  const { clear, resetClearFlag } = props;
  const [chatLogList, setChatLogList] = useStateCallback<ChatLogItem[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [disabledInput, setDisabledInput] = useState(false);
  const [visible, message, showToast] = useToast();

  const askInput = (content: string) => {
    if (disabledInput) {
      showToast("您已经询问过一次了，请等待上次响应");
      return;
    }
    setChatLogList([
      ...chatLogList, 
      {
        order: chatLogList[chatLogList.length - 1]?.order + 1 || 1,
        type: "ask",
        content,
        createTime: getCurrentDateTimeString()
      }
    ], () => {
      chatContainerRef.current && Scroll.ScrollToBottom(chatContainerRef.current);
      setDisabledInput(true);
    });
  };

  // 计算是否需要展示时间
  // 当连续两条消息类型一致且时间间隔不超过10秒，就不需要展示时间
  const compareTimeString = (timeStr1: string, timeStr2: string) => {
    return calcDateStringValue(timeStr1, timeStr2) > 10;
  };

  useEffect(() => {
    if (clear) {
      setChatLogList([], () => {
        resetClearFlag();
      }); 
    }
    return () => {
      resetClearFlag();
    };
  }, [clear, resetClearFlag, setChatLogList]);

  return (
    <div className={`${module.container} flex column gap-row-1`}>
      <section ref={chatContainerRef} className={module.content}>
        <QuickAction askInput={askInput} />
        <section className={module.log}>
          {
            chatLogList.length ? chatLogList.map((item, index) => {
              const showTime = index > 0
                ? compareTimeString(item.createTime, chatLogList[index - 1].createTime) 
                : false;
              return <ChatLog key={item.order} {...item} showTime={showTime} />;
            }) : ''
          }
        </section>
      </section>
      <section className={module.input}>
        <ChatInput askInput={askInput} disabled={disabledInput} />
      </section>
      { visible ? <Toast message={message} msgType="warning"></Toast> : '' }
    </div>
  );
}

export default GptChatCom;