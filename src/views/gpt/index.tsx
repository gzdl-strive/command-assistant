import module from "./style.module.css";

function GptChat() {
  return (
    <div className={module.container}>
      {/* 功能区——侧边栏 */}
      <aside className={module.function}>
        aside
      </aside>
      {/* 聊天——主内容区 */}
      <main className={module.chat}>
        main-gpt-chat
      </main>
    </div>
  );
}

export default GptChat;