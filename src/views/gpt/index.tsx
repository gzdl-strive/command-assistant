import { useEffect } from "react";
import GptFunc from "./components/func";
import GptChatCom from "./components/chat";
import Scroll from "@u/scroll";
import module from "./style.module.css";

function GptChat() {
  useEffect(() => {
    Scroll.ScrollToPos(110);
  }, []);

  return (
    <div className={`${module.container} grid`}>
      {/* 功能区——侧边栏 */}
      <aside className={module.function}>
        <GptFunc />
      </aside>
      {/* 聊天——主内容区 */}
      <main className={module.chat}>
        <GptChatCom />
      </main>
    </div>
  );
}

export default GptChat;