const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const bodyParser = require('body-parser');
const sequelize = require("./src/config/configDb"); // Importar o objeto sequelize
const usuarioRouter = require("./src/modules/usuario/routes/index.js");
const turmaRouter = require("./src/modules/turma/routes/index.js");
const cicloRouter = require("./src/modules/turma/routes/cicloRoutes.js");
const avaliacaoRouter = require("./src/modules/turma/routes/avaliacaoRoutes.js");
const frequenciaRouter = require("./src/modules/frequencia/routes/index.js");

const app = express();

// Cors 
var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use("/api/usuarios", usuarioRouter);
app.use("/api/turmas", turmaRouter);
app.use("/api/ciclos", cicloRouter);
app.use("/api/avaliacao", avaliacaoRouter);
app.use("/api/frequencia", frequenciaRouter);

// Inicialização do servidor
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco autenticado!");
    await sequelize.sync({ alter: true, force: true }); // Sincroniza o banco de dados
    console.log("Banco de dados sincronizado com sucesso!");

    console.log(`Servidor rodando em http://localhost:${PORT}!`);
  } catch (error) {
    console.error("Erro ao inicializar o servidor:", error);
  }
});