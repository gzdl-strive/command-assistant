import AnalogKeyboard from "@c/analogKeyboard";
import module from "./style.module.css";
import { AboutType } from "@cfg/typing";

function About(props: AboutType) {
  const { introduction, experience, portfolio } = props;
  // console.log(introduction, experience, portfolio);
  return (
    <div className={`${module.about__container}`}>
      <div className={`${module.about__box} ${module.horizontal}`}>
        <div className={`${module.about__front} ${module.about__face} flex column gap-row-2 j_center a_center`}>
          <h2 className={module.front__title}>{introduction.name}</h2>
          <h3 className={module.front__subtitle}>{introduction.description}</h3>
          <div className={`${module.front__content} grid`}>
            {introduction.data.length && introduction.data.map(item => (
              <div className={`flex column gap-row-0-5`} key={item.name}>
                <span className={module.front__value}>{ item.value }</span>
                <span className={module.front__name}>{ item.name }</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${module.about__back} ${module.about__face}`}>反面</div>
        <div className={`${module.about__top} ${module.about__face}`}>上面</div>
        <div className={`${module.about__bottom} ${module.about__face}`}>下面</div>
        <div className={`${module.about__left} ${module.about__face}`}>左面</div>
        <div className={`${module.about__right} ${module.about__face}`}>右面</div>
      </div>
      <div className={`${module.about__keyboard} grid`}>
        <span></span>
        <AnalogKeyboard name="↑" />
        <span></span>
        <AnalogKeyboard name="←" />
        <AnalogKeyboard name="↓" />
        <AnalogKeyboard name="→" />
      </div>
    </div>
  );
}

export default About;