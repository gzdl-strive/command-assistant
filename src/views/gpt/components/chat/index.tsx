import { useRef } from "react";
import useStateCallback from "@h/useStateCallback";
import QuickAction from "./components/quickAction";
import ChatLog from "./components/chatLog";
import ChatInput from "./components/chatInput";
import Scroll from "@u/scroll";
import { getCurrentDateTimeString } from "@u/common";
import { ChatLogItem } from "./typing";
import module from "./style.module.css";

function GptChatCom() {
  const [chatLogList, setChatLogList] = useStateCallback<ChatLogItem[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const askInput = (content: string) => {
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
    });
  };

  return (
    <div className={`${module.container} flex column gap-row-1`}>
      <section ref={chatContainerRef} className={module.content}>
        <QuickAction askInput={askInput} />
        <section className={module.log}>
          {
            chatLogList.length ? chatLogList.map(item => {
              return <ChatLog key={item.order} {...item} />;
            }) : ''
          }
        </section>
      </section>
      <section className={module.input}>
        <ChatInput />
      </section>
    </div>
  );
}

export default GptChatCom;