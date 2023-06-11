type ModelPanleType = "Doc" | "Q&A" | "Game" | "GPT";

type ThemeType = "light" | "dark";

interface ModePanelMap {
  name: string;
  describe: string;
  type: ModelPanleType;
  icon?: string;
}

type CommonPanelMap = {
  title: string;
  icon: string;
  describe: string;
  type: ModelPanleType;
}

interface ExperienceItem {
  title: string;
  subtitle: string;
  time: string;
}

interface PortfolioItem {
  title: string;
  address: string;
  icon: string;
}

interface AboutType {
  introduction: {
    name: string;
    description: string;
    data: Record<"name" | "value", string>[];
  };
  experience: {
    name: string;
    data: ExperienceItem[];
  };
  portfolio: {
    name: string;
    data: PortfolioItem[];
  }
}

interface FooterCommonType {
  name: string;
  url: string;
}

interface GlobalConfig {
  header: {
    title: string;
    subtitle: string;
    scrollCritical?: number;
    theme: ThemeType;
  },
  content: {
    modePanelList: ModePanelMap[];
    commonPanelList: CommonPanelMap[];
    about: AboutType;
  },
  footer: {
    title: string;
    subtitle: string;
    social: FooterCommonType[];
    recommend: FooterCommonType[];
  }
}

export type {
  ModelPanleType,
  GlobalConfig,
  ModePanelMap,
  CommonPanelMap,
  AboutType
};