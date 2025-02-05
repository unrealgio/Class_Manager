import styles from "./Buscar.module.css";

const Buscar = () => {
  return (
    <div className={styles.buscar}>
      <input type="text" placeholder="Buscar turma" />
      <button>Buscar</button>
    </div>
  );
};

export default Buscar;
