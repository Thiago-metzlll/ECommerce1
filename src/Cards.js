import React from "react";
import "./cards.css"; // opcional, para estilizar depois

function Card({ title, price, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <h3 className="card-title">{title}</h3>
      <p className="card-price">R$ {price}</p>
      <button className="card-btn">Comprar</button>
    </div>
  );
}

export default Card;
