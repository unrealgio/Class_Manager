import React from "react";
import Logo from "../Logo";
import UserIcon from "../UserIcon";
import styles from "./Header.module.css"; // Importando o CSS Module

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <UserIcon />
    </header>
  );
};

export default Header;
