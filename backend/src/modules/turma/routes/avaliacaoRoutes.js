const express = require('express');
const { editarNotaAluno, criarNotaAluno, listarNotasAlunos } = require('../../turma/controllers/AvaliaçãoController');
const autenticar = require('../../../middleware/autenticar');
const { verificarTipoUsuario } = require('../../../middleware/controleAcesso');
const router_Avaliacao = express.Router();

router_Avaliacao.patch('/:avaliacaoId', autenticar, verificarTipoUsuario('professor'), editarNotaAluno);

router_Avaliacao.post('/', autenticar, verificarTipoUsuario('professor'), criarNotaAluno);

router_Avaliacao.get('/:turmaId/notas', autenticar, verificarTipoUsuario('professor'), listarNotasAlunos);
module.exports = router_Avaliacao;