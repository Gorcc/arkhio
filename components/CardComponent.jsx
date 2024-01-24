"use client"
import React from "react";
import "../app/Styles/CardComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


const CardComponent = ({ title, description, type, image, url }) => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike((prevLike) => !prevLike);
    console.log(like)

  }

  const typeClassMap = {
    UI: "ui",
    Design: "design",
    Icon:"icon",
    Code:"code"
  
  };
  const typeClass = typeClassMap[type] || "";


  return (
    <div className="card-container">
      <a href={url} target="_blank">
        <img src={image} alt="" />
      </a>

      <div className="title-fav">
        <div className="card-title">
          <h1>{title}</h1>
        </div>
        <FontAwesomeIcon onClick={handleLike} className={`heart-icon ${like ? "liked" : ""}`} icon={faHeart}></FontAwesomeIcon>
      </div>
      <div className="card-description">{description}</div>
      <div className={`card-type ${typeClass}`}>{type}</div>
    </div>
  );
}; ""

export default CardComponent;