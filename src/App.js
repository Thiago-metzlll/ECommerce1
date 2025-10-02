import React from "react";
import CardsPage from "./CardsPage";
import "./App.css"; // opcional, para estilizar depois



function App() {
  return (
    <div className="body-background">
      <h1 className="titulo-cidades">Arquitetura Histórica das cidades Latinas</h1>
      <CardsPage />
    </div>
  );
}

export default App;
