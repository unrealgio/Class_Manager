import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // Provedor do Helmet
import Turmas from "./pages/Turmas";
import Ciclos from "./pages/Ciclos"; // ✅ Ajuste o caminho
import Login from "./pages/Login/index";
import Legenda from "./pages/Legenda/index";
import Ajuda from "./pages/Ajuda/index";
import VerNotas from "./pages/VerNotas/index";
import Avaliacao from "./pages/Avaliacao";
import Frequencia from "./pages/Frequencia";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/turmas" element={<Turmas />} />
          <Route path="/ajuda/legenda" element={<Legenda />} />
          {/* 🔹 Agora a rota de ciclos aceita o ID da turma */}
          <Route path="/turma/:turmaId/ciclos" element={<Ciclos />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/notas" element={<VerNotas />} />
          <Route path="/turmas/avaliacao" element={<Avaliacao />} />
          <Route path="/turmas/frequencia" element={<Frequencia />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
