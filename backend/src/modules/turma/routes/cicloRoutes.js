const express = require('express');
const { listarCiclosTurma } = require('../controllers/cicloController');
const autenticar = require('../../../middleware/autenticar');
const { verificarTiposUsuarios } = require('../../../middleware/controleAcesso');
const router_Ciclos = express.Router();

router_Ciclos.get('/:turmaId', autenticar, verificarTiposUsuarios(['professor']), listarCiclosTurma);

module.exports = router_Ciclos;