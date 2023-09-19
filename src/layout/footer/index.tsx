import SvgIcon from "@c/svg-icon";
import module from "./style.module.css";
import globalConfig from "@cfg/global";

const { footer: { title, subtitle, social, recommend } } = globalConfig;

function Footer() {
  return (
    <footer className={module.footer}>
      <div className={`${module.footer__content} container grid gap-row-3`}>
        <div className={`${module.footer__header}`}>
          <h2 className={module.footer__title}>{title}</h2>
          <h3 className={module.footer__subtitle}>{subtitle}</h3>
        </div>
        <div className={`${module.footer__contact} flex gap-col-1`}>
          {
            social.length && social.map(item => (
              <a
                href={item.url}
                target="_blank"
                key={item.name}
                rel="noreferrer"
                className={module.social__link}
              >
                <SvgIcon name={item.name} className={module.social__icon}></SvgIcon>
              </a>
            ))
          }
        </div>
        <div className={`${module.footer__recommend} flex gap-col-1`}>
          {
            recommend.length && recommend.map(item => (
              <a
                key={item.name + item.url}
                href={item.url}
                className={`${module['footer__recommend--item']}`}
                target="_blank"
                rel="noreferrer"
              >
                {item.name}
              </a>
            ))
          }
        </div>
      </div>
      <p className={`${module.footer__describe}`}>
        All of this content are ©2023 by individual 
        <a href="https://github.com/gzdl-strive" target="_blank" className={module['footer__descibe--author']} rel="noreferrer">
          &nbsp;gzdl-strive&nbsp;
        </a>
        contributors.
      </p>
    </footer>
  );
}

export default Footer;