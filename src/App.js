import React from "react";
import CardsPage from "./CardsPage";
import "./App.css"; // opcional, para estilizar depois



function App() {
  return (
    <div className="body-background">
      <h1 style={{ textAlign: "center" }}>Cidades Latinas</h1>
      <CardsPage />
    </div>
  );
}

export default App;
