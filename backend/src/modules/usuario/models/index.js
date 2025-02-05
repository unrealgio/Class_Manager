
const { Turma, Ciclo, Avaliacao } = require('../../turma/models/index.js');
const Usuario = require('../../usuario/models/Usuario');
const UsuarioTurma = require('../../usuario/models/UsuarioTurma');

// Relacionamento entre Usuario e Turma via UsuarioTurma
Usuario.belongsToMany(Turma, {
    through: UsuarioTurma,
    as: 'usuarioTurmas',

    foreignKey: 'usuarioId',
});

Turma.belongsToMany(Usuario, {
    through: UsuarioTurma,
    as: 'turmaUsuarios',

    foreignKey: 'turmaId',
});

// Exporta os modelos
module.exports = {
    Turma,
    Ciclo,
    Avaliacao,
    Usuario,
    UsuarioTurma,
};
