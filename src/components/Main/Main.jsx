import React, { useState, useContext, useEffect } from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";
import About from "../About/About";
import { useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { saveArticle, deleteArticle } from "../../utils/api"; // backend functions
import "./Main.css";

function Main({ isSavedNews, isLoggedIn, articles, searchTerm, isLoading }) {
  const [articlesToShow, setArticlesToShow] = useState(3);
  const { savedArticles, setSavedArticles } = useContext(CurrentUserContext);
  const { pathname } = useLocation();

  const handleShowMore = () => {
    setArticlesToShow((prev) => prev + 3);
  };

  const handleSaveArticle = async (article) => {
    try {
      const saved = await saveArticle(article); // call backend
      setSavedArticles((prev) => [...prev, saved]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await deleteArticle(articleId); // call backend
      setSavedArticles((prev) => prev.filter((a) => a._id !== articleId));
    } catch (err) {
      console.error(err);
    }
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
          onSave={handleSaveArticle}
          onDelete={handleDeleteArticle}
          savedArticles={savedArticles}
        />
      )}
      {pathname === "/" && <About />}
    </section>
  );
}

export default Main;

// import NewsCardList from "../NewsCardList/NewsCardList";
// import Preloader from "../Preloader/Preloader";
// import NothingFound from "../NothingFound/NothingFound";
// import About from "../About/About";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./Main.css";

// function Main({
//   isSavedNews,
//   isLoggedIn,
//   articles,
//   searchTerm,
//   isLoading,
//   onSave,
//   onDelete,
//   savedNews,
//   savedArticles,
// }) {
//   const [articlesToShow, setArticlesToShow] = useState(3);
//   const { pathname } = useLocation();
//   const handleShowMore = () => {
//     setArticlesToShow((prev) => prev + 3);
//   };
//   return (
//     <section className="main">
//       {isLoading ? (
//         <Preloader />
//       ) : articles.length === 0 && searchTerm && !isLoggedIn ? (
//         <NothingFound />
//       ) : (
//         <NewsCardList
//           articles={articles}
//           searchTerm={searchTerm}
//           isSavedNews={isSavedNews}
//           isLoggedIn={isLoggedIn}
//           handleShowMore={handleShowMore}
//           articlesToShow={articlesToShow}
//           onSave={onSave}
//           onDelete={onDelete}
//           savedNews={savedNews}
//           savedArticles={savedArticles}
//         />
//       )}
//       {pathname === "/" ? <About /> : ""}
//     </section>
//   );
// }

// export default Main;
