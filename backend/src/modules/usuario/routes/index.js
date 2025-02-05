const express = require('express');
const autenticar = require('../../../middleware/autenticar');
const {
    autenticarUsuario,
    obterTurmasUsuario,
    alterarSenha,
    listarCiclosAluno,
    listarTurmasAluno,
    listarNotasAluno,
    obterPerfil,
} = require('../controllers/index');
const { verificarTipoUsuario } = require('../../../middleware/controleAcesso');
const router_Usuario = express.Router();

// Rotas de autenticação
router_Usuario.post('/login', autenticarUsuario); // Login do usuário
router_Usuario.patch('/senha', autenticar, alterarSenha); // Alterar senha no primeiro acesso

// Rotas do perfil
router_Usuario.get('/perfil', autenticar, obterPerfil); // Obter perfil do usuário autenticado

// Rotas do professor
router_Usuario.get('/professor/turmas', autenticar, verificarTipoUsuario('professor'), obterTurmasUsuario); // Obter turmas do professor

// Rotas do aluno
router_Usuario.get('/aluno/turmas', autenticar, verificarTipoUsuario('aluno'), listarTurmasAluno); // Listar turmas do aluno
router_Usuario.get('/aluno/ciclos', autenticar, verificarTipoUsuario('aluno'), listarCiclosAluno); // Listar ciclos do aluno
router_Usuario.get('/aluno/notas', autenticar, verificarTipoUsuario('aluno'), listarNotasAluno); // Listar notas do aluno

module.exports = router_Usuario;

