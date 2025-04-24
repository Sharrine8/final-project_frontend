import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ isSavedNews, isLoggedIn, articles, searchTerm }) {
  return (
    <section className="cards">
      {isSavedNews ? (
        <p>Saved News Page</p>
      ) : (
        <ul className="cards__list">
          {articles.map((article, index) => {
            return (
              <NewsCard
                key={index}
                article={article}
                category={searchTerm || "Top match"}
                isSavedNews={isSavedNews}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default NewsCardList;
