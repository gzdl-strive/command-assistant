import QuickAction from "./components/quickAction";
import ChatInput from "./components/chatInput";
import module from "./style.module.css";

function GptChatCom() {
  return (
    <div className={`${module.container} flex column gap-row-1`}>
      <section className={module.content}>
        <section className={module.quick}>
          <QuickAction />
        </section>
        <section className={module.ask}>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
          <div>6666</div>
        </section>
      </section>
      <section className={module.input}>
        <ChatInput />
      </section>
    </div>
  );
}

export default GptChatCom;