import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Para navegação dinâmica
import Layout from "../../components/Layout";
import styles from "./Turmas.module.css";
import Breadcrumb from "../../components/Breadcrumb";
import { Helmet } from "react-helmet-async";
import Paginacao from "../../components/Paginacao";

function GerenciarTurmas1() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busca, setBusca] = useState("");
  const itensPorPagina = 6;
  const navigate = useNavigate(); // 🔹 Para redirecionar ao clicar em uma turma

  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/usuarios/professor/turmas", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar turmas.");
        }

        const data = await response.json();
        setTurmas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTurmas();
  }, []);

  // 🔹 Função para abrir a página de ciclos da turma clicada
  const handleClick = (turma) => {
    navigate(`/turma/${turma.id}/ciclos`);
  };

  const mudarPagina = (pagina) => {
    setPaginaAtual(pagina);
  };

  // 🔹 Agora a busca também filtra por unidadeOperativa
  const turmasFiltradas = turmas.filter((turma) =>
    turma.nome.toLowerCase().includes(busca.toLowerCase()) ||
    turma.cod.includes(busca) ||
    turma.unidadeOperativa.toLowerCase().includes(busca.toLowerCase())
  );

  // Paginação
  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  const turmasPaginadas = turmasFiltradas.slice(indexPrimeiroItem, indexUltimoItem);
  const totalPaginas = Math.ceil(turmasFiltradas.length / itensPorPagina);

  return (
    <Layout>
      <Helmet>
        <title>Turmas</title>
      </Helmet>
      <div className={styles.container}>
        <Breadcrumb />

        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar turma, código ou unidade"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className={styles.searchButton}>Buscar</button>
        </div>

        <h2 className={styles.titulo}>Selecione a turma</h2>

        {loading ? (
          <p className={styles.loading}>Carregando turmas...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : turmasPaginadas.length === 0 ? (
          <p className={styles.noResults}>Nenhuma turma encontrada.</p>
        ) : (
          <div className={styles.listContainer}>
            {turmasPaginadas.map((turma) => (
              <div
                key={turma.id}
                className={styles.listItem}
                onClick={() => handleClick(turma)}
              >
                {turma.nome} {turma.cod} | {turma.unidadeOperativa}
              </div>
            ))}
          </div>
        )}

        <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} mudarPagina={mudarPagina} />
      </div>
    </Layout>
  );
}

export default GerenciarTurmas1;
