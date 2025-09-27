import React, { useState, useEffect } from "react";
import Card from "./Card.js";
import "./cards.css";

function CardsPage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cards")
      .then((res) => res.json())
      .then((data) => setProdutos(data.bancodedados)) // acessa a chave 'bancodedados'
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {produtos.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default CardsPage;
