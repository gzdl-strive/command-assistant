type GptFuncType = "clear_history" | "feature_add" | "bug_report";

interface GptFuncItem {
  key: string;
  title: string;
  type: GptFuncType;
  icon: string;
}

interface GptFuncProps {
  handleFunc: (type: GptFuncType) => void;
}

export type {
  GptFuncType,
  GptFuncItem,
  GptFuncProps
};