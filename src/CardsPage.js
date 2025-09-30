import React, { useState, useEffect } from "react";
import Card from "./Cards.js";
import "./cards.css";

/*
  Componente CardsPage
  - Busca cidades do backend
  - Renderiza os cards na tela
  - Permite adicionar novas cidades via formulário
*/
function CardsPage() {
  // -------------------------
  // Estado para armazenar cidades
  // -------------------------
  const [produtos, setProdutos] = useState([]);

  // -------------------------
  // Estados para controlar o formulário
  // -------------------------
  const [title, setTitle] = useState("");   // nome da cidade
  const [price, setPrice] = useState("");   // população
  const [image, setImage] = useState("");   // URL da imagem

  // -------------------------
  // Busca cidades existentes ao montar o componente
  // -------------------------
  useEffect(() => {
    fetch("http://localhost:5000/api/cards")
      .then((res) => res.json())
      .then((data) => {
        console.log("API respondeu:", data);
        setProdutos(data.bancodedados);
      })
      .catch((err) => console.error("Erro ao buscar cidades:", err));
  }, []);

  // -------------------------
  // Função para adicionar nova cidade
  // -------------------------
  const adicionarProduto = async (novoProduto) => {
    try {
      const resposta = await fetch("http://localhost:5000/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto),
      });

      const produtoCriado = await resposta.json();
      console.log(produtoCriado);
      setProdutos((prevProdutos) => [...prevProdutos, produtoCriado]);
    } catch (erro) {
      console.error("Erro ao adicionar cidade:", erro);
    }
  };

  // -------------------------
  // Tratamento do submit do formulário
  // -------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !image) return; // validação simples
    adicionarProduto({ title, price, image });
    setTitle("");
    setPrice("");
    setImage("");
  };

  // -------------------------
  // JSX retornado
  // -------------------------
  return (
    <div>
      {/* Formulário de adição de cidade */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nome da cidade"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="População"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="URL da imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="add-card-btn">
          Adicionar Cidade
        </button>
      </form>

      {/* Lista de cards renderizados */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {produtos.map((item) => (
          <Card
            key={item.id}
            title={item.title}   // nome da cidade
            price={item.price}   // população
            image={item.image}   // imagem da cidade
          />
        ))}
      </div>
    </div>
  );
}

export default CardsPage;
