interface PopularItem {
  title: string;
  count: number;
}

interface HistoryItem {
  title: string;
  success: boolean;
}

interface ChatLogItem {
  order: number;
  type: "ask" | "answer";
  content: string;
}

export type {
  PopularItem,
  HistoryItem,
  ChatLogItem
};