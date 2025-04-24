import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">@2024 Supersite, Powered by News API</p>
      <div className="footer__links">
        <Link to="/" className="footer__link">
          Home
        </Link>
        <Link to="https:/www.tripleten.com" className="footer__link">
          TripleTen
        </Link>

        <div className="footer__weblinks">
          <Link to="https://github.com/Sharrine8" className="footer__weblink">
            <button className="footer__weblink_btn footer__github" />
          </Link>
          <Link
            to="https://www.linkedin.com/in/christia-anderson/"
            className="footer__weblink"
          >
            <button className="footer__weblink_btn footer__linkedin" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
