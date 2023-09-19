import { 
  useState,
  useEffect,
  useRef,
  useCallback,
  SetStateAction
} from "react";

const useStateCallback = <T>(defaultValue: T) => {
  const [state, setState] = useState(defaultValue);
  // 监听新状态的回调器_用于保存callback函数
  const listenRef = useRef<ComFunc>();
  const _setState = useCallback((newVal: SetStateAction<T>, callback?: ComFunc) => {
    listenRef.current = callback;
    setState(newVal);
  }, []);

  // 监听状态变化，调用callback
  useEffect(() => {
    listenRef.current && listenRef.current(state);
  }, [state]);

  return [state, _setState] as [T, (val: SetStateAction<T>, cb?: ComFunc) => void];
};

export default useStateCallback;