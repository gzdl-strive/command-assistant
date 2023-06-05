import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Content from "@v/content";
import ErrorPage from "@l/error";
import Document from "@v/document";
import QA from "@v/q&a";
import Game from "@v/game";
import GPT from "@v/gpt";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Content />
      },
      {
        path: "document",
        element: <Document />
      },
      {
        path: "q&a",
        element: <QA />
      },
      {
        path: "game",
        element: <Game />
      },
      {
        path: "gpt",
        element: <GPT />
      },
    ]
  }
]);

export default routes;