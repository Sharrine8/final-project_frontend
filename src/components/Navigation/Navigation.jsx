import { Link, useLocation } from "react-router-dom";
import logout_black from "../../assets/logout-black.svg";
import { useContext, useState, useEffect } from "react";
import logout_white from "../../assets/logout-white.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Navigation.css";

function Navigation({ isLoggedIn, openLoginModal, onLogout }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const currentUser = useContext(CurrentUserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 430);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isWhite = isHome || (menuOpen && isMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 430);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`nav ${isHome ? "" : "nav__saved-news"} ${
        menuOpen && isMobile ? "nav__background-color_type_home" : ""
      }`}
    >
      <Link
        to="/"
        className={`nav__logo ${isWhite ? "" : "nav__logo_saved-news"}`}
      >
        NewsExplorer
      </Link>
      {isMobile &&
        (!menuOpen ? (
          <button
            onClick={toggleMenu}
            className="nav__burger"
            aria-label="Open menu"
          >
            <span
              className={`nav__span ${
                isHome ? "nav__span_type_white" : "nav__span_type_black"
              }`}
            />
            <span
              className={`nav__span ${
                isHome ? "nav__span_type_white" : "nav__span_type_black"
              }`}
            />
          </button>
        ) : (
          <button
            onClick={toggleMenu}
            className={`nav__close-btn ${
              isHome ? "nav__span_type_white" : "nav__span_type_black"
            }`}
            aria-label="Close menu"
          >
            <span
              className={`nav__close-icon ${
                isHome ? "nav__span_type_white" : "nav__span_type_black"
              }`}
            ></span>
            <span
              className={`nav__close-icon ${
                isHome ? "nav__span_type_white" : "nav__span_type_black"
              }`}
            ></span>
          </button>
        ))}
      <ul className={`nav__links ${menuOpen ? "nav__links_open" : ""}`}>
        <li className="nav__li">
          <Link
            to="/"
            className={`nav__link nav__link_type_home ${
              isHome
                ? `nav__link_type_white ${
                    isMobile ? "" : "nav__link_type_white_active"
                  }`
                : "nav__link_type_black"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <li className="nav__li">
            <Link
              to="/saved-news"
              className={`nav__link nav__link_saved-news ${
                isHome
                  ? "nav__link_type_white"
                  : `nav__link_type_black ${
                      isMobile ? "" : "nav__link_type_black_active"
                    }`
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Saved Articles
            </Link>
          </li>
        )}
        <li className="nav__li">
          {isLoggedIn ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
              className={`nav__link nav__btn ${
                isWhite
                  ? "nav__btn_logged-in_white"
                  : "nav__btn_logged-in_black"
              }`}
            >
              {currentUser.name}
              <img
                alt="logout-icon"
                src={isHome ? logout_white : logout_black}
              />
            </button>
          ) : (
            <button
              className="nav__link nav__btn"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openLoginModal();
              }}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
      {menuOpen && (
        <div className="nav__overlay" onClick={() => setMenuOpen(false)}></div>
      )}
    </nav>
  );
}

export default Navigation;
