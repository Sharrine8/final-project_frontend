import NewsCardList from "../NewsCardList/NewsCardList";
import "./Main.css";

function Main({ isSavedNews, isLoggedIn, articles, searchTerm }) {
  return (
    <section className="main">
      <NewsCardList
        articles={articles}
        searchTerm={searchTerm}
        isSavedNews={isSavedNews}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
}

export default Main;
