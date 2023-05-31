import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <h2 className="footer__title">command-assistant</h2>
        <h3 className="footer__subtitle">retrieval command</h3>
        <div className="footer__mode">
          <span>github</span>
          <span>gitee</span>
          <span>b站</span>
        </div>
        <div className="footer__recommend">
          <span>gzdlprofile</span>
          <span>vitv-admin</span>
          <span>my-single-room</span>
        </div>
      </div>
      <div className="footer__describe">
        <span>logo</span>
        <p>some describe.....................</p>
      </div>
    </footer>
  );
}

export default Footer;