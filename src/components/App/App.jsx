import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useState, useEffect } from "react";
import { getEverything } from "../../utils/api";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setArticles([]);
      return;
    }
    try {
      const data = await getEverything(searchTerm);
      console.log("Fetched articles:", data);
      setArticles(data.articles);
    } catch (err) {
      console.error("Failed to fetch articles");
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
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        <About />
        <Footer />
      </div>
      <RegisterModal
        closeActiveModal={closeActiveModal}
        isOpen={activeModal === "register"}
      />
    </div>
  );
}

export default App;
