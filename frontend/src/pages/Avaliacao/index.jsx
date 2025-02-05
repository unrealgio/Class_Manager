import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "./Avaliacao.module.css";
import Breadcrumb from "../../components/Breadcrumb";
import TabelaAvaliacao from "../../components/TabelaAvaliacao";
import { Helmet } from "react-helmet-async";

function Avaliacao() {
  return (
    <Layout>
      <Helmet>
        <title>Avaliação</title>
      </Helmet>

      <div className={styles.container}>
        <Breadcrumb />

        <h2 className={styles.titulo}>Registro de Avaliação</h2>

        <TabelaAvaliacao />
      </div>
    </Layout>
  );
}

export default Avaliacao;
