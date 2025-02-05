const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb');

const Avaliacao = sequelize.define('Avaliacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.ENUM('escrita', 'oral', 'classe'), // Define o tipo de avaliação
        allowNull: false,
    },
    criterios: {
        type: DataTypes.JSON, // Se postgree: jsonb se mysql: json. Armazena os critérios específicos da avaliação (ex.: uso de inglês, fluência, etc.)
        allowNull: false,
    },
    cicloId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Ciclos',
            key: 'id',
        },
        allowNull: false,
    },
    alunoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuarios', // Refere-se ao aluno que realizou a avaliação
            key: 'id',
        },
        allowNull: false,
    },
});

module.exports = Avaliacao;
