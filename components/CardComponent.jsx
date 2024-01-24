import React from "react";
import "../app/Styles/CardComponent.scss";

const CardComponent = ({ title, description, type, image }) => {
    return (
      <div className="cards-container">
        <img src={image} alt="" />
        <div className="title-fav">
          <div className="card-title">
            <h1>{title}</h1>
          </div>
          icon
        </div>
        <div className="card-description">{description}</div>
        <div className="card-type">{type}</div>
      </div>
    );
  };
  
  export default CardComponent;