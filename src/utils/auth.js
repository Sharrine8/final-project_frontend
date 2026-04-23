const BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// LOGIN
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// CHECK TOKEN
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// export const authorize = (email, password) => {
//   return new Promise((resolve, reject) => {
//     resolve({ token: "faketoken" });
//   });
// };

// //User: 1. Register 2. Login with same info for best results
// export const checkToken = (token) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return new Promise((resolve, reject) => {
//     resolve({
//       data: {
//         name: user.name,
//         email: user.email,
//         _id: "681248a04e982e1d9bfdf0d7",
//       },
//     });
//   });
// };
