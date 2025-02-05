const express = require('express');
const autenticar = require('../../../middleware/autenticar');
const { verificarTipoUsuario } = require('../../../middleware/controleAcesso');
const router_Turmas = express.Router();
const {criarTurma} = require('../controllers/index')

router_Turmas.post('/turmas', autenticar, verificarTipoUsuario(['professor']), criarTurma);

router_Turmas.get('/professor/turmas', autenticar, verificarTipoUsuario('professor'));



module.exports = router_Turmas;