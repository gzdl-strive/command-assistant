type ChatType = "ask" | "answer";

interface ChatLogItem {
  order: number;
  type: ChatType;
  createTime: string;
  content: string;
}

export type {
  ChatLogItem
};