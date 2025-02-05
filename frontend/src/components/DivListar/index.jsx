import styles from "./DivListar.module.css";

const turmas = [
  { id: 1, nome: "Advanced 162.2025.1 | Senac Alecrim" },
  { id: 2, nome: "Advanced 163.2025.1 | Senac Zona Sul" },
  { id: 3, nome: "Intermediate 188.2025.1 | Senac Centro" },
  { id: 4, nome: "Junior 143.2025.1 | Senac Centro" },
  { id: 5, nome: "Junior 149.2025.2 | Senac Centro" },
];

const DivListar = () => {
  return (
    <div className={styles.divListar}>
      <h2>Selecione a turma</h2>
      <ul>
        {turmas.map((turma) => (
          <li key={turma.id} onClick={() => alert(`Selecionado: ${turma.nome}`)}>
            {turma.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DivListar;
