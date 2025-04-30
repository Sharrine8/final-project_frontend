import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import { useLocation } from "react-router-dom";

function Header({
  isSavedNews,
  isLoggedIn,
  searchTerm,
  setSearchTerm,
  handleSearch,
  openLoginModal,
}) {
  const { pathname } = useLocation();

  return (
    <header className={`header ${isSavedNews ? "" : "header__home"}`}>
      <Navigation isLoggedIn={isLoggedIn} openLoginModal={openLoginModal} />
      {isSavedNews ? (
        <section className="header__container header__container_saved-news">
          <h2 className="header__saved-news-title">Saved articles</h2>
          <p className="header__text">Elise, you have 5 saved articles</p>
          <p className="header__keywords">
            By keywords: Nature, Yellowstone, and 2 other
          </p>
        </section>
      ) : (
        <section className="header__container header__container_home">
          <h1 className="header__title">What's going on in the world?</h1>
          <p className="header__subtitle">
            Find the latest news on any topic and save them in your personal
            account
          </p>
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
        </section>
      )}
    </header>
  );
}

export default Header;
