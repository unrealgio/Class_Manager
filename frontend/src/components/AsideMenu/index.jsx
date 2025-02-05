import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AsideMenu.module.css";

const AsideMenu = () => {
  const location = useLocation();

  return (
    <aside className={styles.asideMenu}>
      <ul>
        {/* 🔹 Ver Notas */}
        <li className={`${styles.menuItem} ${location.pathname.startsWith("/notas") ? styles.active : ""}`}>
          <Link to="/notas" className={styles.menuLink}>
            <img src="/journal-text.svg" alt="Ver Notas" className={styles.menuIcon} />
            <span>Ver Notas</span>
          </Link>
        </li>

        {/* 🔹 Gerenciar Turmas (inclui Ciclos) */}
        <li className={`${styles.menuItem} ${(location.pathname.startsWith("/turmas") || location.pathname.startsWith("/turma")) ? styles.active : ""}`}>
          <Link to="/turmas" className={styles.menuLink}>
            <img src="/people-fill.svg" alt="Gerenciar Turmas" className={styles.menuIcon} />
            <span>Gerenciar Turmas</span>
          </Link>
        </li>

        {/* 🔹 Ajuda */}
        <li className={`${styles.menuItem} ${location.pathname.startsWith("/ajuda") ? styles.active : ""}`}>
          <Link to="/ajuda" className={styles.menuLink}>
            <img src="/info-circle.svg" alt="Ajuda" className={styles.menuIcon} />
            <span>Ajuda</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AsideMenu;
