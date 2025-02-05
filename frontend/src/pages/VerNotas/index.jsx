import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import styles from "./VerNotas.module.css";
import Breadcrumb from "../../components/Breadcrumb";
import BotaoDeVerNotas from "../../components/BotaoDeNotas";
import { Helmet } from "react-helmet-async";

const VerNotas = () => {
    const [turmas, setTurmas] = useState([]);
    const [ciclos, setCiclos] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [selectedTurma, setSelectedTurma] = useState("");
    const [selectedCiclo, setSelectedCiclo] = useState("");

    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:3001/api/usuarios/professor/turmas", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setTurmas(data);
            } catch (error) {
                console.error("Erro ao buscar turmas:", error);
            }
        };

        fetchTurmas();
    }, []);

    useEffect(() => {
        const fetchCiclos = async () => {
            if (selectedTurma) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(`http://localhost:3001/api/ciclos/${selectedTurma}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    setCiclos(data);
                } catch (error) {
                    console.error("Erro ao buscar ciclos:", error);
                }
            }
        };

        fetchCiclos();
    }, [selectedTurma]);

    useEffect(() => {
        const fetchAlunos = async () => {
            if (selectedCiclo) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(`http://localhost:3001/api/usuarios/aluno/ciclos/${selectedCiclo}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    setAlunos(data);
                } catch (error) {
                    console.error("Erro ao buscar alunos:", error);
                }
            }
        };

        fetchAlunos();
    }, [selectedCiclo]);

    return (
        <Layout>
            <Helmet>
                <title>Notas</title>
            </Helmet>
            <div className={styles.container}>
                <Breadcrumb />

                <form action="" className={styles.form}>
                    <label className={styles.titulo} htmlFor="">Selecione sua turma</label>
                    <select
                        name="turmas"
                        className={styles.escolha}
                        onChange={(e) => setSelectedTurma(e.target.value)}
                    >
                        <option value="">Selecione uma turma</option>
                        {turmas.map(turma => (
                            <option key={turma.id} className={styles.opcao} value={turma.id}>
                                {turma.nome} | {turma.cod}
                            </option>
                        ))}
                    </select>

                    <label className={styles.titulo} htmlFor="">Selecione o ciclo</label>
                    <select name="ciclo" className={styles.escolha} onChange={(e) => setSelectedCiclo(e.target.value)}>
                        <option value="">Selecione um ciclo</option>
                        {ciclos.map(ciclo => (
                            <option key={ciclo.id} className={styles.opcao} value={ciclo.id}>
                                {ciclo.nome}
                            </option>
                        ))}
                    </select>

                    <label className={styles.titulo} htmlFor="">Selecione o aluno</label>
                    <select name="aluno" className={styles.escolha}>
                        <option value="">Selecione um aluno</option>
                        {alunos.map(aluno => (
                            <option key={aluno.id} className={styles.opcao} value={aluno.id}>
                                {aluno.nome}
                            </option>
                        ))}
                    </select>
                </form>

                <div className={styles.botao}>
                    <BotaoDeVerNotas />
                </div>
            </div>
        </Layout>
    );
};

export default VerNotas;
