import React from "react";
import styles from "./Paginacao.module.css";

const Paginacao = ({ paginaAtual, totalPaginas, mudarPagina }) => {
  if (totalPaginas <= 1) return null; // Oculta a paginação se houver apenas 1 página

  return (
    <div className={styles.paginacao}>
      {[...Array(totalPaginas)].map((_, index) => (
        <button
          key={index}
          className={`${styles.pageButton} ${
            paginaAtual === index + 1 ? styles.activePage : ""
          }`}
          onClick={() => mudarPagina(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginacao;
