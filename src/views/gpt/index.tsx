import { useEffect, useState } from "react";
import GptFunc from "./components/func";
import GptChatCom from "./components/chat";
import Scroll from "@u/scroll";
import { GptFuncType } from "./components/func/typing";
import module from "./style.module.css";

function GptChat() {
  const [clear, setClear] = useState(false);

  const handleFunc = (type: GptFuncType) => {
    switch(type) {
    case "clear_history":
      setClear(true);
      break;
    default:
      console.log(type);
      break;
    }
  };

  const resetClearFlag = () => {
    setClear(false);
  };

  useEffect(() => {
    Scroll.ScrollToPos(110);
  }, []);

  return (
    <div className={`${module.container} grid`}>
      {/* 功能区——侧边栏 */}
      <aside className={module.function}>
        <GptFunc handleFunc={handleFunc} />
      </aside>
      {/* 聊天——主内容区 */}
      <main className={module.chat}>
        <GptChatCom clear={clear} resetClearFlag={resetClearFlag} />
      </main>
    </div>
  );
}

export default GptChat;