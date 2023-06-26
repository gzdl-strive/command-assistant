interface PopularItem {
  title: string;
  count: number;
}

interface HistoryItem {
  title: string;
  success: boolean;
}

export type {
  PopularItem,
  HistoryItem
};