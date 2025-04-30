import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";
import About from "../About/About";
import { useState } from "react";
import "./Main.css";

function Main({ isSavedNews, isLoggedIn, articles, searchTerm, isLoading }) {
  const [articlesToShow, setArticlesToShow] = useState(3);
  const handleShowMore = () => {
    setArticlesToShow((prev) => prev + 3);
  };
  return (
    <section className="main">
      {isLoading ? (
        <Preloader />
      ) : articles.length === 0 && searchTerm && !isLoggedIn ? (
        <NothingFound />
      ) : (
        <NewsCardList
          articles={articles}
          searchTerm={searchTerm}
          isSavedNews={isSavedNews}
          isLoggedIn={isLoggedIn}
          handleShowMore={handleShowMore}
          articlesToShow={articlesToShow}
        />
      )}
      <About />
    </section>
  );
}

export default Main;
