import module from "./style.module.css";
import { ChatLogItem } from "@v/q&a/typing";

function ChatItem(props: ChatLogItem) {
  const { createTime, content, type } = props;

  return (
    // 当上一项和当前项的类型一致且时间间隔短的化，不需要在显示时间
    <div className={`${type === "ask" ? module.ask : module.answer}`}>
      <div className={module.time}>{createTime}</div>
      <div className={`${module.content} flex`}>
        <p className={module.text}>{content}</p>
      </div>
    </div>
  );
}

export default ChatItem;