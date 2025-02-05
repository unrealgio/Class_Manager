/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Para navegação ao clicar no Card
import styles from "./Ajuda.module.css"; // 🔹 Importação do CSS Module
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumb";
import { Helmet } from "react-helmet-async";

const Ajuda = () => {
  const navigate = useNavigate();

  return (
    
    <Layout>
      <Helmet>
        <title>Ajuda</title>
      </Helmet>
      <div className={styles.container}>
      <Breadcrumb />
        {/* 🔹 Breadcrumb Posicionado Igual à Página de Legenda */}

        <div className={styles.content}>
          {/* 🔹 Card: Legendas 🔹 */}
          <div className={styles.card} onClick={() => navigate("/ajuda/legenda")}>
            <span className={styles.icon}>
              <i className="fa-solid fa-book"></i> {/* Ícone atualizado */}
            </span>
            <h3>Legendas</h3>
            <p>Avaliação de Classe</p>
            <p>Avaliação Oral</p>
            <p>Avaliação Escrita</p>
          </div>

          {/* 🔹 Card: Contatos 🔹 */}
          <div className={styles.card}>
            <span className={styles.icon}>
              <i className="fa-solid fa-phone"></i> {/* Ícone atualizado */}
            </span>
            <h3>Contatos</h3>
            <p>(84) 4004-1000</p>
            <p>www.rn.senac.br</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ajuda;
