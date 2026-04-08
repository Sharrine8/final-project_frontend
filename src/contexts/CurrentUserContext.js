import React, { createContext, useState, useEffect } from "react";
import { checkToken } from "./api";

const CurrentUserContext = createContext({
  _id: "",
  name: "",
  email: "",
  token: "",
  setUser: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    token: localStorage.getItem("token") || "",
  });

  // Fetch current user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    checkToken(token)
      .then((data) => {
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          token,
        });
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        // Optionally clear invalid token
        localStorage.removeItem("token");
        setUser({ _id: "", name: "", email: "", token: "" });
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ ...user, setUser }}>
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
