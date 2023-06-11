import AnalogKeyboard from "@c/analogKeyboard";
import module from "./style.module.css";
import { AboutType } from "@cfg/typing";
import { DirectionBtn } from "./typing";

let horizontal = 0;

function About(props: AboutType) {
  const { introduction, experience, portfolio } = props;

  const transform = (value: string) => {
    const element = document.querySelector('.about__box') as HTMLDivElement;
    element.style.transform = value;
  };

  const handleKeyboard = (direction: DirectionBtn) => {
    switch(direction) {
    case "left":
      horizontal -= 1;
      break;
    case "right":
      horizontal += 1;
      break;
    default:
      break;
    }
    transform(`rotateY(${90 * horizontal}deg)`);
  };

  return (
    <div className={`${module.about__container}`}>
      <div className={`${module.about__box} about__box`}>
        <div className={`${module.about__front} ${module.about__face} flex column gap-row-2 j_center a_center`}>
          <h2 className={module.about__title}>{introduction.name}</h2>
          <h3 className={module.about__subtitle}>{introduction.description}</h3>
          <div className={`${module.front__content}`}>
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
        <div className={`${module.about__left} ${module.about__face} flex column gap-row-1 j_center a_center`}>
          <h2 className={module.about__title}>{experience.name}</h2>
          <div className={`${module.left__content}`}>
            {experience.data.length && experience.data.map(item => (
              <div className={`${module.left__item} flex column gap-row-0-5`} key={item.title}>
                <span className={module.left__title}>{ item.title }</span>
                <span className={module.left__subtitle}>{ item.subtitle }</span>
                <span className={module.left__time}>{ item.time }</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${module.about__right} ${module.about__face} flex column gap-row-2 j_center a_center`}>
          <h2 className={module.about__title}>{portfolio.name}</h2>
          <div className={`${module.right__content} grid gap-row-1 gap-col-1`}>
            {portfolio.data.length && portfolio.data.map(item => (
              <a
                href={item.address}
                className={`${module.right__item} flex column gap-row-1 j_center a_center`}
                key={item.title}
                target="_blank" 
                rel="noreferrer"
              >
                <img className={module.right__icon} src={item.icon} alt="" />
                <span className={module.right__title}>{ item.title }</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={`${module.about__keyboard} grid`}>
        <AnalogKeyboard name="←" onClick={() => handleKeyboard("left")} />
        <AnalogKeyboard name="→" onClick={() => handleKeyboard("right")} />
      </div>
    </div>
  );
}

export default About;