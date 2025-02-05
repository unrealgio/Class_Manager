import React from "react";
import styles from "./Logo.module.css"; // Importando CSS Module

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src="/senac.png" alt="Logo" />
    </div>
  );
};

export default Logo;
