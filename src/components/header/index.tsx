import globalConfig from "@cfg/global";
import "@s/module/header.css";

function Header() {
  return (
    // *** header start ***
    <header className="header">
      <nav className="nav container flex j_between a_center">
        <a href="#" className="nav__logo" title={globalConfig.title}>
          { globalConfig.title }
        </a>
        <div className="nav__icon">
          <span>icon1</span>
          <span>icon2</span>
          <span>icon3</span>
          <span>icon4</span>
        </div>
      </nav>
    </header>
    // *** header end ***
  );
}

export default Header;