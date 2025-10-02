import React from "react";
import "./cards.css"; 

function Card({ title, price, image, onUpdate, onDelete }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <h3 className="card-title">{title}</h3>
      <p className="card-price"> População: {price}</p>
      
      <div className="card-actions">
        <button className="card-btn">Ver</button>
        <button className="card-btn update" onClick={onUpdate}>Atualizar</button>
        <button className="card-btn delete" onClick={onDelete}>Deletar</button>
      </div>
    </div>
  );
}

export default Card;
