// api.js
const API_KEY = "0af95d023d7e405d8f25417590c9f6de";
const BASE_URL = "https://newsapi.org/v2";
const BACKEND_URL = "http://localhost:3000"; // adjust if deployed

const headers = {
  "Content-Type": "application/json",
};

// Generic check response
export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Generic fetch request
export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// --- NewsAPI Search ---
export function getEverything(query) {
  const apiUrl = `${BASE_URL}/everything?q=${encodeURIComponent(
    query,
  )}&pageSize=100&apiKey=${API_KEY}`;

  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    apiUrl,
  )}`;

  return request(proxyUrl, {
    method: "GET",
    headers: headers,
  });
}

// --- Backend: User auth ---
// Signin
export function authorize(email, password) {
  return request(`${BACKEND_URL}/users/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  });
}

// Check JWT token and get current user
export function checkToken(token) {
  return request(`${BACKEND_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// --- Backend: Saved articles ---
// Get all saved articles for user
export function getSavedArticles(token) {
  return request(`${BACKEND_URL}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// Save (like) an article
export function saveArticle(article, token) {
  return request(`${BACKEND_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });
}

// Delete (unlike) an article
export function deleteArticle(articleId, token) {
  return request(`${BACKEND_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// const API_KEY = "0af95d023d7e405d8f25417590c9f6de";
// const BASE_URL = "https://newsapi.org/v2";

// const headers = {
//   "Content-type": "application/json",
// };

// export function checkResponse(res) {
//   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
// }

// export function request(url, options) {
//   return fetch(url, options).then(checkResponse);
// }

// export function getEverything(query) {
//   const apiUrl = `${BASE_URL}/everything?q=${encodeURIComponent(
//     query
//   )}&pageSize=100&apiKey=${API_KEY}`;

//   // Use CORS proxy -- need for local connection
//   const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
//     apiUrl
//   )}`;

//   return request(proxyUrl, {
//     method: "GET",
//     headers: headers,
//   });
// }

// export function saveArticle(article) {
//   return new Promise((resolve, reject) => {
//     resolve(article);
//   });
// }

// export function deleteArticle(articleId) {
//   return new Promise((resolve, reject) => {
//     resolve({ message: `Article with ID ${articleId} has been deleted.` });
//   });
// }
