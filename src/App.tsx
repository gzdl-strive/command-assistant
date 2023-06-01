import { Fragment } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "@l/header";
import Content from "@v/content";
import Footer from "@l/footer";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Content />
  }
]);

console.log('aaa');


function App() {
  return (
    <Fragment>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </ Fragment>
  );
}

export default App;
