const API_KEY = "0af95d023d7e405d8f25417590c9f6de";
const BASE_URL = "https://newsapi.org/v2";

const headers = {
  "Content-type": "application/json",
};

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getEverything(query = "technology") {
  const apiUrl = `${BASE_URL}/everything?q=${encodeURIComponent(
    query
  )}&pageSize=100&apiKey=${API_KEY}`;

  // Use CORS proxy
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    apiUrl
  )}`;

  return request(proxyUrl, {
    method: "GET",
    headers: headers,
  });
}

export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    resolve(article);
  });
}

export function deleteArticle(articleId) {
  return new Promise((resolve, reject) => {
    resolve({ message: `Article with ID ${articleId} has been deleted.` });
  });
}
