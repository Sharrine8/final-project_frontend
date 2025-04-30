import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { useState, useEffect } from "react";
import { getEverything } from "../../utils/api";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //Location
  const { pathname } = useLocation();
  const isSavedNews = pathname === "/saved-news";

  //API states
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);

  //Modal
  const [activeModal, setActiveModal] = useState("");

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

  // useEffect(() => {
  //   getEverything(searchTerm)
  //     .then((data) => {
  //       setArticles(data.articles);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching articles:", error);
  //     });
  // }, [searchTerm]);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          isSavedNews={isSavedNews}
          isLoggedIn={isLoggedIn}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          openLoginModal={openLoginModal}
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
      />
      <LoginModal
        closeActiveModal={closeActiveModal}
        isOpen={activeModal === "login"}
        switchLoginModal={switchLoginModal}
      />
    </div>
  );
}

export default App;
