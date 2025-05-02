import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { useState, useEffect } from "react";
import { getEverything } from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { authorize, checkToken } from "../../utils/auth";
import { saveArticle, deleteArticle } from "../../utils/api";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [error, setError] = useState("");
  //Location
  const { pathname } = useLocation();
  const isSavedNews = pathname === "/saved-news";

  //API states
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  //User Info
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  //Register

  const onRegister = ({ email, password, name }) => {
    localStorage.setItem("user", JSON.stringify({ email, password, name }));
    closeActiveModal();
  };

  //Login/Logout
  const handleLogin = ({ email, password }) => {
    authorize(email, password)
      .then((res) => {
        const token = res.token;
        localStorage.setItem("token", token);
        return checkToken(token);
      })
      .then((res) => {
        const { name, email } = res.data;
        setCurrentUser({ name, email });
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser({ password: "", name: "", email: "" });
    setIsLoggedIn(false);
    closeActiveModal();
  };

  //Save or delete articles
  const handleSaveArticle = (article) => {
    console.log(article);
    const cleanedArticle = {
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      source: article.source,
      publishedAt: article.publishedAt,
      id: article.url,
    };
    saveArticle(cleanedArticle)
      .then((saved) => {
        const updated = [saved, ...savedArticles];
        setSavedArticles(updated);
        localStorage.setItem("savedArticles", JSON.stringify(updated));
      })
      .catch((err) => console.error("Failed to save article", err));
  };

  const handleDeleteArticle = (articleId) => {
    deleteArticle(articleId)
      .then(() => {
        const updated = savedArticles.filter((a) => a.id !== articleId);
        setSavedArticles(updated);
        localStorage.setItem("savedArticles", JSON.stringify(updated));
      })
      .catch((err) => console.error("Failed to delete article", err));
  };

  //Modal
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const switchRegisterModal = () => {
    closeActiveModal();
    setActiveModal("login");
  };

  const switchLoginModal = () => {
    closeActiveModal();
    setActiveModal("register");
  };

  //Search Form API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setArticles([]);
      return;
    }
    try {
      setIsLoading(true);
      const data = await getEverything(searchTerm);
      setArticles(data.articles);
    } catch (err) {
      console.error("Failed to fetch articles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(saved);
  }, []);

  // useEffect(() => {
  //   getEverything(searchTerm)
  //     .then((data) => {
  //       setArticles(data.articles);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching articles:", error);
  //     });
  // }, [searchTerm]);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user) {
  //     setActiveModal("login");
  //     return;
  //   }
  //   setCurrentUser({ name: user.name, email: user.email });
  //   setIsLoggedIn(true);
  // }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            isSavedNews={isSavedNews}
            isLoggedIn={isLoggedIn}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            openLoginModal={openLoginModal}
            onLogout={handleLogout}
            savedArticles={savedArticles}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Main
                    isSavedNews={isSavedNews}
                    isLoggedIn={isLoggedIn}
                    articles={articles}
                    searchTerm={searchTerm}
                    isLoading={isLoading}
                    onSave={handleSaveArticle}
                    onDelete={handleDeleteArticle}
                  />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                isLoggedIn ? (
                  <Main
                    isSavedNews={isSavedNews}
                    isLoggedIn={isLoggedIn}
                    articles={articles}
                    searchTerm={searchTerm}
                    isLoading={isLoading}
                    onSave={handleSaveArticle}
                    onDelete={handleDeleteArticle}
                    savedNews={savedArticles}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
          <Footer />
        </div>
        <RegisterModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "register"}
          switchRegisterModal={switchRegisterModal}
          onRegister={onRegister}
        />
        <LoginModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "login"}
          switchLoginModal={switchLoginModal}
          handleLoginSubmit={handleLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
