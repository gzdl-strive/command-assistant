import { ModelPanleType } from "./typing";

type TypeMapRoute = Record<ModelPanleType, string>;

const typeMapRoute: TypeMapRoute = {
  "Doc": "document",
  "Q&A": "q&a",
  "Game": "game",
  "GPT": "gpt"
};

export default typeMapRoute;