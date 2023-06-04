import { Fragment } from "react";
import { RouterProvider } from "react-router-dom";
import Header from "@l/header";
import Footer from "@l/footer";
import routes from "@r";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Header />
      <RouterProvider router={routes} />
      <Footer />
    </ Fragment>
  );
}

export default App;
