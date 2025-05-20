import NewsCard from "../NewsCard/NewsCard";
import { useLocation } from "react-router-dom";
import "./NewsCardList.css";

function NewsCardList({
  isSavedNews,
  isLoggedIn,
  articles,
  handleShowMore,
  articlesToShow,
  onSave,
  onDelete,
  savedNews,
  searchTerm,
  savedArticles,
}) {
  const { pathname } = useLocation();
  const showCardsSection =
    searchTerm !== "" ||
    articles.length > 0 ||
    (pathname === "/saved-news" && savedNews.length > 0);

  return showCardsSection ? (
    <section className="cards">
      {pathname === "/" ? (
        <h2 className="cards__title">Search results</h2>
      ) : null}
      {pathname === "/saved-news" ? (
        <ul className="cards__list">
          {savedNews.slice(0, articlesToShow).map((article, index) => {
            return (
              <NewsCard
                key={index}
                article={article}
                category={article.keyword || "Top match"}
                isSavedNews={isSavedNews}
                isLoggedIn={isLoggedIn}
                onSave={onSave}
                onDelete={onDelete}
              />
            );
          })}
        </ul>
      ) : (
        <ul className="cards__list">
          {articles.slice(0, articlesToShow).map((article, index) => {
            return (
              <NewsCard
                key={index}
                article={article}
                category={article.keyword || "Top match"}
                isSavedNews={isSavedNews}
                isLoggedIn={isLoggedIn}
                onSave={onSave}
                onDelete={onDelete}
                savedArticles={savedArticles}
              />
            );
          })}
        </ul>
      )}
      {(pathname !== "/saved-news" && articlesToShow < articles.length) ||
      (pathname === "/saved-news" && articlesToShow < savedNews.length) ? (
        <button className="cards__show-more-btn" onClick={handleShowMore}>
          Show more
        </button>
      ) : null}
    </section>
  ) : null;
}

export default NewsCardList;
