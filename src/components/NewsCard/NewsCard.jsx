import React from "react";
import "./NewsCard.css";
import { Link, useLocation } from "react-router-dom";
import backup_img from "../../assets/search_background.png";

function NewsCard({
  article,
  category,
  isSavedNews,
  isLoggedIn,
  onSave,
  onDelete,
}) {
  const { title, description, url, urlToImage, source, publishedAt } = article;
  const { pathname } = useLocation();
  const categoryUppercase =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <li className="news-card">
      <p className="news-card__category">
        {category ? categoryUppercase : "Top match"}
      </p>
      {pathname === "/" && !isLoggedIn ? (
        <div className="news-card__btn-container">
          <button
            className="news-card__btn news-card__bookmark"
            type="button"
          />
          <div className="news-card__bookmark-overlay">
            Sign in to save articles
          </div>
        </div>
      ) : pathname === "/" && isLoggedIn ? (
        <div className="news-card__btn-container">
          <button
            className="news-card__btn news-card__bookmark"
            type="button"
            onClick={() => onSave(article)}
          />
        </div>
      ) : (
        <div className="news-card__btn-container">
          <button
            onClick={() => onDelete(article.url)}
            className="news-card__btn news-card__delete"
            type="button"
          />
        </div>
      )}
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
