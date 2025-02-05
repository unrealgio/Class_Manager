/* eslint-disable */
import React from "react";
import styles from "./Legenda.module.css";
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumb";
import { Helmet } from "react-helmet-async";

const Legenda = () => {
  return (
    <Layout>
      <Helmet>
        <title>Legenda</title>
      </Helmet>
      <div className={styles.container}>
        <Breadcrumb />

        <h2 className={styles.title}>Legendas de Avaliação</h2>

        {/* 🔹 SEÇÃO: AVALIAÇÃO ORAL 🔹 */}
        <div className={styles.legendaSection}>
          <div className={styles.legendaTitle}>
            <h3>Avaliação Oral</h3>
          </div>

          <div className={styles.legendaGrid}>
            <div className={styles.legendaCard}>
              <h4>
                <span className={`${styles.iconSmall} ${styles.iconBlue}`}>
                  <i className="fas fa-comments"></i>
                </span>
                FLUÊNCIA:
              </h4>
              <p>
                5 = Desenvolve ideias claramente, sem precisar de ajuda, com
                pouca hesitação.
              </p>
              <p>
                4 = Desenvolve ideias claramente, quase sem ajuda e/ou com certa
                hesitação.
              </p>
              <p>
                3 = Ideias nem sempre claras e com certa hesitação; precisa de
                pouca ajuda.
              </p>
              <p>
                2 = Dificuldade em elaborar e desenvolver ideias claramente;
                precisa de muita ajuda.
              </p>
              <p>1 = Não consegue se expressar claramente.</p>
            </div>

            <div className={styles.legendaCard}>
              <h4>
                <span className={`${styles.iconSmall} ${styles.iconBlue}`}>
                  <i className="fas fa-book"></i>
                </span>
                VOCABULÁRIO:
              </h4>
              <p>
                5 = Bem explorado e aplicado, fazendo uso de novo vocabulário.
              </p>
              <p>
                4 = Explora e aplica, nem sempre corretamente; faz pouco uso de
                vocabulário novo.
              </p>
              <p>3 = Uso básico; nem sempre corretamente.</p>
              <p>
                2 = Normalmente tem dificuldade em lembrar termos apropriados.
              </p>
              <p>1 = Muita dificuldade para aplicar termos corretamente.</p>
            </div>
          </div>
        </div>

        {/* 🔹 SEÇÃO: AVALIAÇÃO DE CLASSE 🔹 */}
        <div className={styles.legendaSection}>
          <div className={styles.legendaTitle}>
            <h3>Avaliação de Classe</h3>
          </div>

          <div className={styles.legendaGrid}>
            <div className={styles.legendaCard}>
              <h4>
                <span className={`${styles.iconSmall} ${styles.iconBlue}`}>
                  <i className="fas fa-users"></i>
                </span>
                INTERAÇÃO:
              </h4>
              <p>
                0 = Se nega a participar e/ou não demonstra interesse em se
                comunicar no idioma.
              </p>
              <p>
                1 = Participa somente quando é chamado e demonstra resistência
                em interagir.
              </p>
              <p>
                2 = Participa de forma esporádica, somente quando é chamado.
              </p>
              <p>
                3 = Se envolve nas atividades propostas, tem boa relação com os
                colegas.
              </p>
              <p>4 = Tem iniciativa e se envolve nas atividades propostas.</p>
              <p>
                5 = Tem iniciativa de falar e participa de forma pertinente.
              </p>
            </div>

            <div className={styles.legendaCard}>
              <h4>
                <span className={`${styles.iconSmall} ${styles.iconBlue}`}>
                  <i className="fas fa-chart-line"></i>
                </span>
                PROGRESSO:
              </h4>
              <p>
                0 = Não aplica e/ou explora o conteúdo estudado em sala de aula
                de forma satisfatória.
              </p>
              <p>
                1 = Raramente aplica e explora o conteúdo estudado em sala de
                aula.
              </p>
              <p>
                2 = Às vezes aplica e explora o conteúdo estudado em sala de
                aula.
              </p>
              <p>
                3 = Frequentemente aplica e explora o conteúdo estudado em sala
                de aula.
              </p>
              <p>
                4 = Quase sempre aplica e explora o conteúdo estudado em sala de
                aula.
              </p>
              <p>
                5 = Sempre aplica e explora o conteúdo estudado em sala de aula.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Legenda;
