import React from "react";
import styles from "./LoginForm.module.css"; // 

const LoginForm = () => {
  return (
    <form className={styles.loginForm}>
      <input type="email" placeholder="Usuário" className={styles.input} />
      <input type="password" placeholder="Senha" className={styles.input} />
      <button type="submit" className={styles.button}>Acessar</button>
    </form>
  );
};

export default LoginForm;
