import module from "./style.module.css";
import { AboutType } from "@cfg/typing";

function About(props: AboutType) {
  const { introduction, experience, portfolio } = props;

  console.log(introduction);
  
  return (
    <div className={module.about}>
      <div className={module.about__face}></div>
      <div className={module.about__face}></div>
      <div className={module.about__face}></div>
      <div className={module.about__face}></div>
      <div className={module.about__face}></div>
      <div className={module.about__face}></div>
    </div>
  );
}

export default About;