import React, { useState, useEffect } from "react";
import Card from "./Cards.js";
import "./cards.css";

function CardsPage() {
  const [produtos, setProdutos] = useState([]);
  const [title, setTitle] = useState("");   
  const [price, setPrice] = useState("");   
  const [image, setImage] = useState("");   

  // Buscar cidades
  useEffect(() => {
    fetch("http://localhost:5000/api/cards")
      .then((res) => res.json())
      .then((data) => {
        console.log("API respondeu:", data);
        setProdutos(data.bancodedados);
      })
      .catch((err) => console.error("Erro ao buscar cidades:", err));
  }, []);

  // POST - adicionar cidade
  const adicionarProduto = async (novoProduto) => {
    try {
      const resposta = await fetch("http://localhost:5000/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto),
      });

      const produtoCriado = await resposta.json();
      setProdutos((prevProdutos) => [...prevProdutos, produtoCriado]);
    } catch (erro) {
      console.error("Erro ao adicionar cidade:", erro);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !image) return;
    adicionarProduto({ title, price, image });
    setTitle("");
    setPrice("");
    setImage("");
  };

  // DELETE - remover cidade
  const handleDelete = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:5000/api/cards/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) throw new Error("Erro ao deletar cidade");

      setProdutos((prev) => prev.filter((item) => item.id !== id));
    } catch (erro) {
      console.error(erro);
    }
  };

  // PUT - atualizar cidade
  const handleUpdate = async (id) => {
    const novoNome = prompt("Digite o novo nome da cidade:");
    const novaPop = prompt("Digite a nova população:");
    const novaImagem = prompt("Digite a nova URL da imagem:");

    if (!novoNome || !novaPop || !novaImagem) return;

    try {
      const resposta = await fetch(`http://localhost:5000/api/cards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: novoNome,
          price: novaPop,
          image: novaImagem,
        }),
      });

      const atualizado = await resposta.json();

      setProdutos((prev) =>
        prev.map((item) => (item.id === id ? atualizado : item))
      );
    } catch (erro) {
      console.error("Erro ao atualizar cidade:", erro);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {produtos.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            onUpdate={() => handleUpdate(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}

        {/* Formulário como mais um card */}
        <form
          onSubmit={handleSubmit}
          className="city-form"
          style={{ flex: "0 0 200px" }}
        >
          <h2>Adicionar</h2>
          <input
            placeholder="Cidade"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="População"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
          <input
            placeholder="URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-btn">
            +
          </button>
        </form>
      </div>
    </div>
  );
}

export default CardsPage;
