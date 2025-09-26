import React from "react";
import Card from "./Cards.js";
import "./cards.css";


function CardsPage() {
  const produtos = [
    { id: 1, title: "Camisa React", price: 59.9, image: "https://via.placeholder.com/150" },
    { id: 2, title: "Tênis JS", price: 199.9, image: "https://via.placeholder.com/150" },
    { id: 3, title: "Mochila Dev", price: 120.0, image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="cards-container">
  {produtos.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>

  );
}

export default CardsPage;
