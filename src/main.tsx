import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import "//at.alicdn.com/t/c/font_4090792_9dozqx37j17.js";
import routes from "@r/index";
import './index.css';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
