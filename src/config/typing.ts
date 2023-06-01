type ModelPanleType = "Doc" | "Q&A" | "Game" | "GPT";

interface ModePanelMap {
  name: string;
  describe: string;
  type: ModelPanleType;
  icon?: string;
}

type CommonPanelMap = Record<"title" | "type" | "icon", string>;

interface ExperienceItem {
  title: string;
  subtitle: string;
  time: string;
}

interface PortfolioItem {
  name: string;
  time: string;
  description: string;
  address: string;
}

interface AboutType {
  introduction: {
    name: string;
    description: string;
    data: Record<"name" | "value", string>[];
  };
  experience: ExperienceItem[];
  portfolio: PortfolioItem[];
}

interface GlobalConfig {
  header: {
    title: string;
    subtitle: string;
    scrollCritical?: number;
  },
  content: {
    modePanelList: ModePanelMap[];
    commonPanelList: CommonPanelMap[];
    about: AboutType;
  }
}

export type {
  GlobalConfig,
  ModePanelMap,
  CommonPanelMap,
  AboutType
};