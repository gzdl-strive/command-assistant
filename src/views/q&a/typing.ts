interface PopularItem {
  title: string;
  count: number;
}

interface HistoryItem {
  title: string;
  success: boolean;
}

type ChatType = "ask" | "answer"

interface ChatLogItem {
  order: number;
  type: ChatType;
  createTime: string;
  content: string;
}

export type {
  PopularItem,
  HistoryItem,
  ChatLogItem
};