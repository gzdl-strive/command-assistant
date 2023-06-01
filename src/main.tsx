import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import "//at.alicdn.com/t/c/font_4090792_ri52p3cyvy.js";
import App from './App';
import './index.css';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
