import QuickAction from "./components/quickAction";
import ChatInput from "./components/chatInput";
import module from "./style.module.css";

function GptChatCom() {
  return (
    <div className={module.container}>
      <section className={module.quick}>
        <QuickAction />
      </section>
      <section className={module.input}>
        <ChatInput />
      </section>
    </div>
  );
}

export default GptChatCom;