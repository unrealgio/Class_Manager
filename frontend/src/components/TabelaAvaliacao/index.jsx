import React from "react";
import styles from "./TabelaAvaliacao.module.css";

const TabelaAvaliacao = () => {
  return (
    <div className={styles.evaluationWrapper}>
      {/* 🔹 Seletor de Avaliação */}
      <div className={styles.selectContainer}>
        <label className={styles.selectLabel}>Tipo de Avaliação:</label>
        <select className={styles.evaluationDropdown}>
          <option>Avaliação Escrita</option>
          <option>Avaliação Oral</option>
          <option>Avaliação de Classe</option>
        </select>
      </div>

      {/* 🔹 Tabela */}
      <div className={styles.tableContainer}>
        <table className={styles.evaluationTable}>
          <thead>
            <tr>
              <th className={styles.nameColumn}>Nome do aluno</th>
              <th>Uso do Idioma</th>
              <th>Leitura</th>
              <th>Escrita</th>
              <th>Compreensão</th>
            </tr>
          </thead>
          <tbody>
            {["Giovanni Felipe", "Arthur Henrique", "João Silva", "Arthur Lira", "Joaquim França"].map((nome, index) => (
              <tr key={index}>
                <td className={styles.nameColumn}>{nome}</td>
                <td><input type="number" className={styles.inputField} /></td>
                <td><input type="number" className={styles.inputField} /></td>
                <td><input type="number" className={styles.inputField} /></td>
                <td><input type="number" className={styles.inputField} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Botões */}
      <div className={styles.buttonContainer}>
        <button className={`${styles.btn} ${styles.back}`} type="button">Voltar</button>
        <button className={`${styles.btn} ${styles.save}`} type="submit">Salvar</button>
      </div>
    </div>
  );
};

export default TabelaAvaliacao;
