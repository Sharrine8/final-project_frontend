// src/hooks/useArticles.js
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getSavedArticles, saveArticle, deleteArticle } from "../utils/api";

export const useArticles = () => {
  const { token } = useContext(CurrentUserContext);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch saved articles on mount or when token changes
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    getSavedArticles(token)
      .then((articles) => setSavedArticles(articles))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [token]);

  // Save an article (like)
  const handleSaveArticle = (article) => {
    if (!token) return;
    return saveArticle(article, token)
      .then((newArticle) => setSavedArticles((prev) => [...prev, newArticle]))
      .catch((err) => setError(err));
  };

  // Delete an article (unlike)
  const handleDeleteArticle = (articleId) => {
    if (!token) return;
    return deleteArticle(articleId, token)
      .then(() =>
        setSavedArticles((prev) =>
          prev.filter((article) => article._id !== articleId),
        ),
      )
      .catch((err) => setError(err));
  };

  return {
    savedArticles,
    loading,
    error,
    handleSaveArticle,
    handleDeleteArticle,
  };
};
