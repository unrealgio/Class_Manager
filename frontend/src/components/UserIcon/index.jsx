import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserIcon.module.css";

const decodeToken = (token) => {
  try {
    const base84Url = token.split(".")[1];
    const base84 = base84Url.replace(/-/g, "+").replace(/_/g, "/");
    const binaryData = Uint8Array.from(atob(base84), (c) => c.charCodeAt(0));

    return JSON.parse(new TextDecoder("utf-8").decode(binaryData));
  } catch (error) {
    return null;
  }
};

const UserIcon = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = token ? decodeToken(token) : null;

  // Obtém o nome do usuário exatamente como está no token
  const [userName, setUserName] = useState(decodedToken?.nome);
  const [isFirstLogin, setIsFirstLogin] = useState(localStorage.getItem("precisaAlterarSenha") === "true");
  const [isModalOpen, setIsModalOpen] = useState(isFirstLogin);

  // Campos do formulário
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Mensagens de feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewPassword("");
    setConfirmNewPassword("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/usuarios/senha", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          novaSenha: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || "Erro ao alterar senha.");
      }

      localStorage.removeItem("precisaAlterarSenha");
      setIsFirstLogin(false);
      setIsModalOpen(false);
      setSuccessMessage("Senha alterada com sucesso!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className={styles.profileIcon}>
        <button className={styles.userButton} onClick={handleOpenModal}>
          <img src="/person-circle.svg" alt="Perfil" className={styles.userIcon} />
        </button>
        <span className={styles.userName}>Olá, {userName}!</span>
        <button className={styles.signOutButton} onClick={handleLogout}>
          <img src="/box-arrow-right.svg" alt="Sair" className={styles.signOutIcon} />
        </button>
      </div>

      {/* Exibe mensagem de sucesso na tela */}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Alteração de Senha</h2>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
              <label>
                Nova Senha:
                <input
                  type="password"
                  placeholder="Digite a nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                Confirmar Nova Senha:
                <input
                  type="password"
                  placeholder="Confirme a nova senha"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </label>
              <div className={styles.modalButtons}>
                <button type="submit" disabled={!newPassword || !confirmNewPassword || newPassword.length < 8 || newPassword !== confirmNewPassword}>
                  Salvar
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isFirstLogin}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserIcon;
