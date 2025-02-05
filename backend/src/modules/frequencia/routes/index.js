const express = require("express");
const autenticar = require("../../../middleware/autenticar");
const { verificarTipoUsuario } = require("../../../middleware/controleAcesso");
const {
  obterFrequenciasUsuario,
  criarFrequencia,
} = require("../controllers/index.js");
const router_Frequencia = express.Router();

router_Frequencia.get("/:id", autenticar, obterFrequenciasUsuario);
router_Frequencia.post("/", autenticar, verificarTipoUsuario("professor"), criarFrequencia
);

module.exports = router_Frequencia;
