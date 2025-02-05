import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 🔹 Capturar o ID da turma
import Layout from "../../components/Layout";
import styles from "./Ciclos.module.css";
import BotaoDeVoltar from "../../components/BotaoDeVoltar";
import Breadcrumb from "../../components/Breadcrumb";
import { Helmet } from "react-helmet-async";

const Ciclos = () => {
  const { turmaId } = useParams(); // 🔹 Obtém o ID da turma da URL
  const [ciclos, setCiclos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCiclos = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/api/ciclos/${turmaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar ciclos.");
        }

        const data = await response.json();
        setCiclos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCiclos();
  }, [turmaId]);

  return (
    <Layout>
      <Helmet>
        <title>Ciclos</title>
      </Helmet>
      <div className={styles.container}>
        <Breadcrumb />
        <h2 className={styles.title}>Ciclos de Avaliação</h2>

        {loading ? (
          <p className={styles.loading}>Carregando ciclos...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : ciclos.length === 0 ? (
          <p className={styles.noResults}>Nenhum ciclo encontrado.</p>
        ) : (
          <div className={styles.main}>
            {ciclos.map((ciclo, index) => (
              <div key={index} className={styles.dciclo}>
                <p>{ciclo.nome}</p>
                <div className={styles.buttonContainer}>
                  {/* 🔹 Botão de Frequência */}
                  <button type="button" className={styles.buttonFrequencia}>
                    <i className="fa-solid fa-user-check"></i> Frequência
                  </button>

                  {/* 🔹 Botão de Lançar Notas */}
                  <button type="button" className={styles.buttonLancar}>
                    <i className="fa-solid fa-upload"></i> Lançar Notas
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <BotaoDeVoltar />
        </div>
      </div>
    </Layout>
  );
};

export default Ciclos;
