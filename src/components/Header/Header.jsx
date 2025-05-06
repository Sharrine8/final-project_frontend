import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  isSavedNews,
  isLoggedIn,
  searchTerm,
  setSearchTerm,
  handleSearch,
  openLoginModal,
  onLogout,
  savedArticles,
  keywords,
}) {
  const { pathname } = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const formatKeywords = () => {
    const capitalize = (word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const uniqueKeywords = [...new Set(keywords.map(capitalize))];

    if (uniqueKeywords.length === 0) return "";
    if (uniqueKeywords.length === 1) return uniqueKeywords[0];
    if (uniqueKeywords.length === 2) return uniqueKeywords.join(" and ");

    const last = uniqueKeywords.pop();
    return `${uniqueKeywords.join(", ")}, and ${last}`;
  };

  return (
    <header className={`header ${isSavedNews ? "" : "header__home"}`}>
      <Navigation
        isLoggedIn={isLoggedIn}
        openLoginModal={openLoginModal}
        onLogout={onLogout}
      />
      {isSavedNews ? (
        <section className="header__container header__container_saved-news">
          <h2 className="header__saved-news-title">Saved articles</h2>
          <p className="header__text">
            {currentUser.name}, you have {savedArticles.length} saved articles
          </p>
          <p className="header__keywords">By keywords: {formatKeywords()}</p>
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
