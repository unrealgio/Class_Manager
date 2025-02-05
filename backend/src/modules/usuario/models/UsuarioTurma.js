const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb');

const UsuarioTurma = sequelize.define('UsuarioTurma', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuarios',
            key: 'id',
        },
        allowNull: false,
    },
    turmaId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Turmas',
            key: 'id',
        },
        allowNull: false,
    },
    tipoRelacao: {
        type: DataTypes.ENUM('professor', 'aluno'),
        allowNull: false,
    },
}, {
    tableName: 'UsuarioTurma', // Define explicitamente o nome da tabela
    timestamps: false,         // Remove createdAt e updatedAt se não forem necessários
});

module.exports = UsuarioTurma;