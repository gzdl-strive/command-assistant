import { useState ,useEffect } from "react";
import module from "./style.module.css";
import Popular from "./components/popular";
import History from "./components/history";
import Chat from "./components/chat";
import { getPopular, getHistory, getChatLog } from "@api/qa";
import { PopularItem, HistoryItem, ChatLogItem } from './typing';

function QA() {
  const [popularList, setPopularList] = useState<PopularItem[]>([]);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [chatLogList, setChatLogList] = useState<ChatLogItem[]>([]);

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

  useEffect(() => {
    getPopularList();
    getHistoryList();
    getChatLogList();
  }, []);

  return (
    <div className={`${module.container} grid gap-col-1-5`}>
      {/* 热门推荐词条 */}
      <aside className={`${module.popular} flex column`} data-title="热门推荐">
        { popularList.length && popularList.map(popular => <Popular key={popular.title} {...popular} />) }
      </aside>
      {/* 对话框 */}
      <main className={module.chat} data-title="知识问答聊天框">
        <Chat logList={chatLogList} />
      </main>
      {/* 历史搜索 */}
      <aside className={`${module.history} flex column`} data-title="历史记录">
        { historyList.length && historyList.map(history => <History key={history.title} {...history} />) }
      </aside>
    </div>
  );
}

export default QA;