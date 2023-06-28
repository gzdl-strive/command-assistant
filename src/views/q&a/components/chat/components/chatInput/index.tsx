import { useRef } from "react";
import SvgIcon from "@c/svg-icon";
import useToast from "@h/useToast";
import Toast from "@c/toast";
import module from "./style.module.css";

interface PropsType {
  handleInput: (input: string) => void;
  disabled: boolean;
}

function ChatInput(props: PropsType) {
  const { handleInput, disabled } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, message, showToast] = useToast();

  // 点击提问
  const sendAsk = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!inputRef.current) return;
    if (disabled) {
      showToast("暂时无法提交新问题", 5000);
      return;
    }
    const inputValue = inputRef.current.value;
    //* 调用父组件方法，将至传递给他，并显示到页面上
    handleInput(inputValue);
    inputRef.current.value = '';
  };

  return (
    <form className={`${module.container} grid gap-col-1-5`} onSubmit={sendAsk}>
      <div className={module.mic__container}>
        <SvgIcon name="mic" className={module.mic}></SvgIcon>
      </div>
      <input 
        ref={inputRef}
        type="text"
        placeholder="请输入问题?"
        className={module.input}
        maxLength={30}
        required
      />
      <button type="submit" className={module.send__container}>
        <SvgIcon name="send" className={module.send}></SvgIcon>
      </button>
      { visible ? <Toast message={message} msgType="warning"></Toast> : '' }
    </form>
  );
}

export default ChatInput;