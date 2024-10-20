import React, { useState } from "react";
import axios from "axios";

function App() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCep(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpar erros anteriores
    setDados(null); // Limpar dados anteriores

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setError("CEP inválido. Tente novamente.");
      } else {
        setDados(response.data);
      }
    } catch (error) {
      setError("Erro ao buscar o CEP. Verifique sua conexão.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Consulta de CEP</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cep">Digite o CEP:</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={handleInputChange}
          placeholder="Ex: 01001000"
          required
          style={{ padding: "8px", margin: "10px 0", width: "100%" }}
        />
        <button type="submit" style={{ padding: "10px", width: "100%" }}>
          Consultar
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {dados && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resultado:</h3>
          <p><strong>CEP:</strong> {dados.cep}</p>
          <p><strong>Logradouro:</strong> {dados.logradouro}</p>
          <p><strong>Bairro:</strong> {dados.bairro}</p>
          <p><strong>Cidade:</strong> {dados.localidade}</p>
          <p><strong>Estado:</strong> {dados.uf}</p>
        </div>
      )}
    </div>
  );
}

export default App;
