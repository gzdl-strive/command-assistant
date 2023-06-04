import { useLocation } from "react-router-dom";
import module from "./style.module.css";

function Document() {
  const location = useLocation();

  console.log(location.state);

  return (
    <div className={module.container}>test</div>
  );
}

export default Document;