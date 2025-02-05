const Turma = require('./Turma');
const Ciclo = require('./Ciclo');
const Avaliacao = require('./Avaliacao');
const Usuario = require('../../usuario/models/Usuario');
const UsuarioTurma = require('../../usuario/models/UsuarioTurma');

// Relacionamento entre Turma e Ciclo
Turma.hasMany(Ciclo, { foreignKey: 'turmaId', as: 'ciclos', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Ciclo.belongsTo(Turma, { foreignKey: 'turmaId', as: 'turma', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relacionamento entre Turma e Usuario via UsuarioTurma
Usuario.belongsToMany(Turma, {
    through: UsuarioTurma,
    as: 'turmas',
    foreignKey: 'usuarioId',
});

Turma.belongsToMany(Usuario, {
    through: UsuarioTurma,
    as: 'usuarios',
    foreignKey: 'turmaId',
});

// Relacionamento entre Ciclo e Avaliacao
Ciclo.hasMany(Avaliacao, { foreignKey: 'cicloId', as: 'avaliacoes', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Avaliacao.belongsTo(Ciclo, { foreignKey: 'cicloId', as: 'ciclo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


//relacionamento entre Usuario e Avaliacao

Usuario.hasMany(Avaliacao, {
    foreignKey: "alunoId",
    as: "avaliacoes",
});

Avaliacao.belongsTo(Usuario, {
    foreignKey: "alunoId",
    as: "aluno",
});


module.exports = {
Turma,
Ciclo,
Avaliacao,
};