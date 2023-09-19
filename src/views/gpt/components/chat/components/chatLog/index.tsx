import { ChatLogItem } from "../../typing";
import module from "./style.module.css";

type ChatLogProps = ChatLogItem & {
  showTime: boolean;
}

function ChatLog(props: ChatLogProps) {
  const { content, type, createTime, showTime } = props;

  return (
    <div className={`${type === "ask" ? module.ask : module.answer}`}>
      {
        showTime ? <div className={module.time}>{createTime}</div> : ''
      }
      <div className={`${module.content} flex`}>
        <p className={module.text}>{content}</p>
      </div>
    </div>
  );
}

export default ChatLog;