const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // relative paths in production
    : "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// --- News Search ---
export function getEverything(query) {
  return request(`${BASE_URL}/news?q=${encodeURIComponent(query)}`, {
    method: "GET",
  });
}

// --- User Auth ---
export function createUser({ email, password, name }) {
  return request(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password, name }),
  });
}

export function loginUser(email, password) {
  return request(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken(token) {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });
}

// --- Saved Articles ---
export function getSavedArticles(token) {
  return request(`${BASE_URL}/articles`, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });
}

export function saveArticle(article, token) {
  return request(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(article),
  });
}

export function deleteArticle(articleId, token) {
  return request(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: { ...headers, Authorization: `Bearer ${token}` },
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
