"use client";
import React from "react";
import "../app/Styles/CardComponent.scss";
import FavoriteButton from "./FavoriteButton";

const CardComponent = ({
  title,
  description,
  type,
  image,
  url,
  userData,
  id,
  userFavs
}) => {
  const typeClassMap = {
    UI: "ui",
    Design: "design",
    Icon: "icon",
    Code: "code",
  };
  const typeClass = typeClassMap[type] || "";

  return (
    <div className="card-container">
      <a href={url} target="_blank">
        <img src={image} alt="Site Image" />
      </a>

      <div className="title-fav">
        <div className="card-title">
          <h1>{title}</h1>
        </div>
        <FavoriteButton userData={userData} postId={id} userFavs={userFavs}></FavoriteButton>
      </div>
      <div className="card-description">{description}</div>
      <div className={`card-type ${typeClass}`}>{type}</div>
    </div>
  );
};
("");

export default CardComponent;
