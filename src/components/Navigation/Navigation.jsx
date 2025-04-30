import { Link, useLocation } from "react-router-dom";
import logout_black from "../../assets/logout-black.svg";
import logout_white from "../../assets/logout-white.svg";
import "./Navigation.css";

function Navigation({ isLoggedIn, openLoginModal }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <nav className={`nav ${isHome ? "" : "nav__saved-news"}`}>
      <Link
        to="/"
        className={`nav__logo ${isHome ? "" : "nav__logo_saved-news"}`}
      >
        NewsExplorer
      </Link>
      {isLoggedIn ? (
        <ul className="nav__links">
          <li className="nav__li">
            <Link
              to="/"
              className={`nav__link nav__link_home ${
                isHome
                  ? "nav__link_white nav__link_white_active"
                  : "nav__link_black"
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav__li">
            <Link
              to="/saved-news"
              className={`nav__link nav__link_saved-news ${
                isHome
                  ? "nav__link_white"
                  : "nav__link_black nav__link_black_active"
              }`}
            >
              Saved Articles
            </Link>
          </li>
          <li className="nav__li">
            <button
              className={`nav__link nav__btn ${
                isHome ? "nav__btn_logged-in_white" : "nav__btn_logged-in_black"
              }`}
            >
              Log out
              <img
                alt="logout-icon"
                src={isHome ? logout_white : logout_black}
              />
            </button>
          </li>
        </ul>
      ) : (
        <ul className="nav__links">
          <li className="nav__li">
            <Link
              to="/"
              className="nav__link nav__link_home nav__link_white_active"
            >
              Home
            </Link>
          </li>
          <li className="nav__li">
            <button
              className="nav__link nav__btn"
              type="button"
              onClick={openLoginModal}
            >
              Sign in
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
