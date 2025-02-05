import React from "react";
import Layout from "../../components/Layout";
import styles from "./Frequencia.module.css";
import Breadcrumb from "../../components/Breadcrumb";
import { Helmet } from "react-helmet-async";
import BotaoDeVoltar from "../../components/BotaoDeVoltar";

function TurmasFrequencia() {
    const handleCheckAll = (checked) => {
        document.querySelectorAll(`.${styles.bodyCell} input[type="checkbox"]`)
            .forEach(checkbox => checkbox.checked = checked);
    };

    const handleSave = () => alert("Frequência confirmada!");

    const students = [
        "Giovanni Felipe", "Maria Silva", "João Souza", "Ana Paula", 
        "Carlos Eduardo", "Fernanda Lima", "Pedro Henrique", 
        "Juliana Alves", "Lucas Pereira", "Mariana Costa"
    ];

    return (
        <Layout>
            <Helmet>
                <title>Frequência</title>
            </Helmet>

            <div className={styles.container}>
                <Breadcrumb />

                {/* 🔹 Header: Select e Botões Lado a Lado */}
                <div className={styles.header}>
                    <select className={styles.select}>
                        <option>Selecione uma aula</option>
                        <option value="1">Aula 1</option>
                        <option value="2">Aula 2</option>
                        <option value="3">Aula 3</option>
                    </select>

                    <div className={styles.buttonsContainer}>
                        <button className={`${styles.button} ${styles.outlineButton}`} onClick={() => handleCheckAll(true)}>
                            <i className="fa-solid fa-user-check"></i> Inserir Presença para Todos
                        </button>
                        <button className={`${styles.button} ${styles.outlineButton}`} onClick={() => handleCheckAll(false)}>
                            <i className="fa-solid fa-user-times"></i> Inserir Falta para Todos
                        </button>
                        <button className={`${styles.button} ${styles.confirmButton}`} onClick={handleSave}>
                            <i className="fa-solid fa-check"></i> Confirmar Frequência
                        </button>
                    </div>
                </div>

                {/* 🔹 Tabela */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.headerRow}>
                                <th className={`${styles.headerCell} ${styles.nameCell}`}>Aluno</th>
                                <th className={styles.headerCell}>1º Horário</th>
                                <th className={styles.headerCell}>2º Horário</th>
                                <th className={styles.headerCell}>3º Horário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index} className={styles.bodyRow}>
                                    <td className={`${styles.bodyCell} ${styles.nameCell}`}>{student}</td>
                                    <td className={styles.bodyCell}><input type="checkbox" /></td>
                                    <td className={styles.bodyCell}><input type="checkbox" /></td>
                                    <td className={styles.bodyCell}><input type="checkbox" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 🔹 Botão de Voltar Posicionado no Final da Tabela */}
                <div className={styles.footer}>
                    <BotaoDeVoltar />
                </div>
            </div>
        </Layout>
    );
}

export default TurmasFrequencia;
