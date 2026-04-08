import { createContext, useState } from "react";

const CurrentUserContext = createContext({
  currentUser: { name: "", email: "" },
  setCurrentUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true" || false,
  );

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;

// import React from "react";

// const CurrentUserContext = React.createContext({
//   name: "",
//   email: "",
// });

// export default CurrentUserContext;
