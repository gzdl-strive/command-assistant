import { ChatLogItem } from "../../typing";
import module from "./style.module.css";

function ChatLog(props: ChatLogItem) {
  const { content, type, createTime } = props;

  const showTime = true;

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