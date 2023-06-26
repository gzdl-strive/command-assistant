import { useState ,useEffect } from "react";
import module from "./style.module.css";
import Popular from "./components/popular";
import History from "./components/history";
import { getPopular, getHistory } from "@api/qa";
import { PopularItem, HistoryItem } from './typing';

function QA() {
  const [popularList, setPopularList] = useState<PopularItem[]>([]);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

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

  useEffect(() => {
    getPopularList();
    getHistoryList();
  }, []);

  return (
    <div className={`${module.container} grid gap-col-1-5`}>
      {/* 热门推荐词条 */}
      <aside className={`${module.popular} flex column`} data-title="热门推荐">
        { popularList.length && popularList.map(popular => <Popular key={popular.title} {...popular} />) }
      </aside>
      {/* 对话框 */}
      <main className={module.chat} data-title="知识问答聊天框"></main>
      {/* 历史搜索 */}
      <aside className={`${module.history} flex column`} data-title="历史记录">
        { historyList.length && historyList.map(history => <History key={history.title} {...history} />) }
      </aside>
    </div>
  );
}

export default QA;