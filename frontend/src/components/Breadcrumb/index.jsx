import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

const routeNames = {
  "ajuda": "Ajuda",
  "legenda": "Legenda",
  "turmas": "Gerenciar Turmas",
  "notas": "Ver Notas",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);

  return (
    <div className={styles.breadcrumb}>
      {/* 🔹 Sempre começa com Home */}
      <Link to="/turmas" className={styles.link}>Home</Link>
      {pathnames.length > 0 && <span className={styles.separator}> / </span>}

      {/* 🔹 Construção dinâmica dos breadcrumbs */}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNames[name] || name.replace("-", " ");

        return (
          <span key={routeTo}>
            {!isLast ? (
              <Link to={routeTo} className={styles.link}>{displayName}</Link>
            ) : (
              <span className={styles.active}>{displayName}</span>
            )}
            {!isLast && <span className={styles.separator}> / </span>}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
