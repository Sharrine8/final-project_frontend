import NewsCard from "../NewsCard/NewsCard";
import { useLocation } from "react-router-dom";
import "./NewsCardList.css";

function NewsCardList({
  isSavedNews,
  isLoggedIn,
  articles,
  searchTerm,
  handleShowMore,
  articlesToShow,
  onSave,
  onDelete,
  savedNews,
}) {
  const { pathname } = useLocation();
  return (
    <section className="cards">
      {pathname === "/saved-news" ? (
        <ul className="cards__list">
          {savedNews.slice(0, articlesToShow).map((article) => {
            return (
              <NewsCard
                key={article.url}
                article={article}
                category={searchTerm || "Top match"}
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
          {articles.slice(0, articlesToShow).map((article) => {
            return (
              <NewsCard
                key={article.url}
                article={article}
                category={searchTerm || "Top match"}
                isSavedNews={isSavedNews}
                isLoggedIn={isLoggedIn}
                onSave={onSave}
                onDelete={onDelete}
              />
            );
          })}
        </ul>
      )}
      {articlesToShow < articles.length && (
        <button className="cards__show-more-btn" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
