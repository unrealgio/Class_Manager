import React from "react";
import styles from "./Layout.module.css";
import AsideMenu from "../AsideMenu";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* Header fixo no topo */}
      <Header />

      {/* Estrutura principal */}
      <div className={styles.mainLayout}>
        <AsideMenu />
        <div className={styles.content}>{children}</div>
      </div>

      {/* Rodapé fixo */}
      <Footer />
    </div>
  );
};

export default Layout;
