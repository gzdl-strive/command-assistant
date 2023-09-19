import { useState } from "react";

let timer: NodeJS.Timeout | null = null;

const useToast = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg: string, duration = 3000): void => {
    setMessage(msg);
    setVisible(true);

    timer = setTimeout(() => {
      setVisible(false);
      clearTimeout(timer as NodeJS.Timeout);
    }, duration);
  };

  const result: [boolean, string, (msg: string, duration?: number) => void] = [visible, message, showToast];

  return result;
};

export default useToast;