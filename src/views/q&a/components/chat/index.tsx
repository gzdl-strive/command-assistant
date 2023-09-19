import { useState, useRef, useEffect, useCallback } from "react";
import useStateCallback from "@h/useStateCallback";
import SvgIcon from "@c/svg-icon";
import ChatItem from "./components/chatItem";
import ChatInput from "./components/chatInput";
import { calcDateStringValue, getCurrentDateTimeString } from "@u/common";
import Scroll from "@u/scroll";
import useToast from "@h/useToast";
import Toast from "@c/toast";
import module from "./style.module.css";
import { ChatLogItem } from "../../typing";

interface ChatProps {
  logList: ChatLogItem[];
  askInput: string;
  resetInputAsk: () => void;
}

const Chat = (props: ChatProps) => {
  const { logList, askInput, resetInputAsk } = props;
  const [showLog, setShowLog] = useState<boolean>(false);
  const [qAList, setQAList] = useStateCallback<ChatLogItem[]>([]);
  const [disabledInput, setDisabledInput] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [visible, message, showToast] = useToast();

  // 点击展示历史日志信息
  const changeShowLog = () => {
    setShowLog(true);
  };

  // 计算是否需要展示时间
  // 当连续两条消息类型一致且时间间隔不超过10秒，就不需要展示时间
  const compareTime = (log: ChatLogItem, index: number, List: ChatLogItem[]): boolean => {
    if (
      index >= 1 && 
      List[index - 1].type === log.type
    ) {
      return calcDateStringValue(log.createTime, List[index - 1].createTime) > 10 ? true : false;
    }
    return true;
  };

  // 输入问题
  const inputAsk = useCallback((input: string) => {
    if (disabledInput) {
      showToast("暂时无法提交新问题", 5000);
      return;
    }
    setQAList([
      ...qAList, {
        order: qAList[qAList.length - 1]?.order + 1 || 1,
        type: "ask",
        createTime: getCurrentDateTimeString(),
        content: input
      }
    ], () => {
      // 滚动到底部
      chatContainerRef.current && Scroll.ScrollToBottom(chatContainerRef.current);
      // 禁用输入
      setDisabledInput(true);
    });
  }, [disabledInput, qAList, setQAList, showToast]);

  useEffect(() => {
    if (askInput) {
      inputAsk(askInput);
      resetInputAsk();
    }
  }, [askInput, inputAsk, resetInputAsk]);

  return (
    <div className={`flex column gap-row-1 ${module.chat}`}>
      <section ref={chatContainerRef} className={module.chat__container}>
        {
          logList.length > 0 
            ? <section className={module.log__container}>
              {
                // 先按order排序，然后显示
                showLog 
                  ? logList.sort((a, b) => a.order - b.order).map((log, index) => {
                    return <ChatItem key={log.order + log.createTime} {...log} showTime={compareTime(log, index, logList)}></ChatItem>;
                  })
                  : <p className={module.log__prompt} onClick={changeShowLog}>
                    <SvgIcon name="down" className={module.log__icon}></SvgIcon>
                    <span>是否显示历史日志信息</span>
                  </p>
              }
            </section>
            : ''
        }
        {
          qAList.length > 0
            ? <section className={`${module.qa__container} ${showLog ? module.qa__border : ''}`}>
              {
                qAList.sort((a, b) => a.order - b.order)
                  .map((qa, index) => {
                    return <ChatItem key={qa.order + qa.createTime} {...qa} showTime={compareTime(qa, index, qAList)}></ChatItem>;
                  })
              }
            </section>
            : ''
        }
      </section>
      <section className={module.chat__input}>
        <ChatInput handleInput={inputAsk} disabled={disabledInput} />
      </section>
      { visible ? <Toast message={message} msgType="warning"></Toast> : '' }
    </div>
  );
};

Chat.displayName = "Chat";

export default Chat;