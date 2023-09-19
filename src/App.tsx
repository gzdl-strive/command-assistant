import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "@l/header";
import Footer from "@l/footer";
import ScrollTop from "@c/scrollTop";
import Scroll from "@u/scroll";

function App() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  if (scrollY > 80) {
    Scroll.Top();
  }

  return (
    <Fragment>
      <Header />
      {/* 嵌套页面 */}
      <Outlet />
      <Footer />
      <ScrollTop />
    </ Fragment>
  );
}

export default App;
