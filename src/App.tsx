import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "@l/header";
import Footer from "@l/footer";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Header />
      {/* 嵌套页面 */}
      <Outlet />
      <Footer />
    </ Fragment>
  );
}

export default App;
