import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logoSenac from "../../assets/img/senac_portal.png";
import iconUser from "../../assets/icons/user.png";
import iconPassword from "../../assets/icons/password.png";
import { Helmet } from "react-helmet-async";

function PgLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Erro geral
  const [emailError, setEmailError] = useState(""); // Erro específico do email
  const [passwordError, setPasswordError] = useState(""); // Erro específico da senha

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validateFields = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("O e-mail é obrigatório.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Digite um e-mail válido.");
      isValid = false;
    }

    if (!senha) {
      setPasswordError("A senha é obrigatória.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || "Erro ao efetuar login.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.usuario?.nome || "Usuário");
      localStorage.setItem("userRole", data.usuario?.tipo || "Aluno");

      // Armazena a flag corretamente
      if (data.precisaAlterarSenha) {
        localStorage.setItem("precisaAlterarSenha", "true");
      } else {
        localStorage.removeItem("precisaAlterarSenha");
      }

      navigate("/turmas"); // Redireciona para a página de turmas após login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <form method="POST" className={styles.container} onSubmit={handleLogin}>
        <div className={styles.containerLeft}></div>
        <div className={styles.containerRight}>
          <div className={styles.containerLogin}>
            <img className={styles.logoSenac} src={logoSenac} alt="Senac Logo" />
            <p className={styles.pLogin}>Faça login para acessar o(s) sistema(s)</p>

            <div className={styles.loginInputs}>
              {/* Erro geral da API */}
              {error && (
                <div className={styles.alertError}>
                  {error}
                  <button type="button" className={styles.closeButton} onClick={() => setError("")}>
                    &times;
                  </button>
                </div>
              )}

              {/* Campo de e-mail */}
              <div className={styles.formInput}>
                <p className={styles.pInput}>Usuário *</p>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    placeholder="usuario@regional.senac.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <img src={iconUser} className={styles.iconsLogin} alt="Ícone Usuário" />
                </div>
                {emailError && (
                  <div className={styles.alertErrorSmall}>
                    {emailError}
                    <button type="button" className={styles.closeButtonSmall} onClick={() => setEmailError("")}>
                      &times;
                    </button>
                  </div>
                )}
              </div>

              {/* Campo de senha */}
              <div className={styles.formInput}>
                <p className={styles.pInput}>Senha *</p>
                <div className={styles.inputWrapper}>
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <img src={iconPassword} className={`${styles.iconsLogin} ${styles.pass}`} alt="Ícone Senha" />
                </div>
                {passwordError && (
                  <div className={styles.alertErrorSmall}>
                    {passwordError}
                    <button type="button" className={styles.closeButtonSmall} onClick={() => setPasswordError("")}>
                      &times;
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className={styles.buttonLogin} disabled={loading}>
                {loading ? "Entrando..." : "Acessar"}
              </button>
              <a href="#" className={styles.forgotPassword}>Esqueci minha senha</a>
            </div>

            <p className={styles.pVersao}>v0.1.2</p>
          </div>
        </div>
      </form>
    </>
  );
}

export default PgLogin;
