import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  isSavedNews,
  isLoggedIn,
  articles,
  searchTerm,
  handleShowMore,
  articlesToShow,
}) {
  return (
    <section className="cards">
      {isSavedNews ? (
        <p>Saved News Page</p>
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
