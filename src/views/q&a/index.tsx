import { useState ,useEffect } from "react";
import Popular from "./components/popular";
import History from "./components/history";
import Chat from "./components/chat";
import Scroll from "@u/scroll";
import { getPopular, getHistory, getChatLog } from "@api/qa";
import { PopularItem, HistoryItem, ChatLogItem } from './typing';
import module from "./style.module.css";

function QA() {
  const [popularList, setPopularList] = useState<PopularItem[]>([]);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [chatLogList, setChatLogList] = useState<ChatLogItem[]>([]);
  const [chatInputAsk, setChatInputAsk] = useState("");

  // 获取热门推荐信息
  const getPopularList = () => {
    getPopular().then(res => {
      if (res && res.code === 200) {
        // 取Top10条
        setPopularList(res.data.slice(0, 10));
      } else {
        setPopularList([]);
      }
    });
  };

  // 获取历史记录
  const getHistoryList = () => {
    getHistory().then(res => {
      if (res && res.code === 200) {
        setHistoryList(res.data);
      } else {
        setHistoryList([]);
      }
    });
  };

  // 获取历史日志信息
  const getChatLogList = () => {
    getChatLog().then(res => {
      if (res && res.code === 200) {
        setChatLogList(res.data as ChatLogItem[]);
      } else {
        setChatLogList([]);
      }
    });
  };

  // 点击热门推荐词条/历史记录调用chat子组件中的方法
  const handleAsk = (input: string) => {
    setChatInputAsk(input);
  };

  // 重置词条
  const handleResetAskInput = () => {
    setChatInputAsk('');
  };

  useEffect(() => {
    Scroll.Top();
    getPopularList();
    getHistoryList();
    getChatLogList();
  }, []);

  return (
    <div className={`${module.container} grid gap-col-1-5`}>
      {/* 热门推荐词条 */}
      <aside className={`${module.popular} flex column`} data-title="热门推荐">
        { 
          popularList.length && 
          popularList.map(popular => <Popular 
            key={popular.title}
            handleAsk={handleAsk}
            {...popular}
          />) 
        }
      </aside>
      {/* 对话框 */}
      <main className={module.chat} data-title="知识问答聊天框">
        <Chat logList={chatLogList} askInput={chatInputAsk} resetInputAsk={handleResetAskInput} />
      </main>
      {/* 历史搜索 */}
      <aside className={`${module.history} flex column`} data-title="历史记录">
        { 
          historyList.length && 
          historyList.map(history => <History 
            key={history.title}
            handleAsk={handleAsk}
            {...history}
          />) 
        }
      </aside>
    </div>
  );
}

export default QA;