const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb');

const Turma = sequelize.define('Turma', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    cargaHoraria: {
        type: DataTypes.FLOAT, // Carga horária total da turma
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    horaAula: {
        type: DataTypes.FLOAT, // Duração de cada aula em horas
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    quantidadeAulas: {
        type: DataTypes.INTEGER, // Agora será armazenado no banco de dados
        allowNull: false,
        defaultValue: 0, // Valor inicial padrão
    },
    dataInicio: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    dataFim: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    unidadeOperativa: {
        type: DataTypes.STRING, // Exemplo: SENAC ALECRIM
        allowNull: false,
    },
}, {
    tableName: 'Turmas',
    getterMethods: {
        // Simula um campo virtual para calcular a quantidade de aulas
        quantidadeAulas() {
            return this.cargaHoraria && this.horaAula
                ? Math.ceil(this.cargaHoraria / this.horaAula)
                : null;

        },
    },
});

module.exports = Turma;
