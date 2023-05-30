type ModelPanleType = "Doc" | "Q&A" | "Game" | "GPT";

interface ModePanelMap {
  name: string;
  describe: string;
  type: ModelPanleType;
}

interface GlobalConfig {
  header: {
    title: string;
    subtitle: string;
    scrollCritical?: number;
  },
  content: {
    modePanelList: ModePanelMap[]
  }
}

export type {
  GlobalConfig,
  ModePanelMap
};