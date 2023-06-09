import { useRef } from "react";
import SvgIcon from "@c/svg-icon";
import module from "./style.module.css";

interface PropsType {
  handleInput: (input: string) => void;
  disabled: boolean;
}

function ChatInput(props: PropsType) {
  const { handleInput, disabled } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  // 点击提问
  const sendAsk = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!inputRef.current) return;

    const inputValue = inputRef.current.value;
    //* 调用父组件方法，将至传递给他，并显示到页面上
    handleInput(inputValue);
    !disabled && (inputRef.current.value = '');
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
    </form>
  );
}

export default ChatInput;