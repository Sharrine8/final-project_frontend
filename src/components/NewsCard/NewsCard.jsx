import React from "react";
import "./NewsCard.css";
import { Link, useLocation } from "react-router-dom";
import backup_img from "../../assets/search_background.png";

function NewsCard({ article, category, isSavedNews, isLoggedIn }) {
  const { title, description, url, urlToImage, source, publishedAt } = article;
  const { pathname } = useLocation();
  return (
    <li className="news-card">
      <p className="news-card__category">
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "Top match"}
      </p>
      <div
        className={`news-card__btn ${
          isSavedNews ? "news-card__delete" : "news-card__bookmark"
        }`}
      />
      <img
        src={urlToImage ? urlToImage : backup_img}
        alt={title}
        className="news-card__img"
      />
      <div className="news-card__info">
        <p className="news-card__date">
          {new Date(publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <Link to={url} className="news-card__title">
          {title}
        </Link>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
