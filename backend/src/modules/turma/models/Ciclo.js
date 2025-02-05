const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb');

const Ciclo = sequelize.define(
  'Ciclo',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    turmaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Turmas',
            key: 'id',
        },
        onDelete: 'CASCADE', // Garante que ciclos sejam excluídos ao deletar a turma
        onUpdate: 'CASCADE', // Garante consistência ao atualizar turmaId
    },
}, {
    tableName: 'Ciclos', // Nome da tabela no banco de dados
    timestamps: true, // Cria campos createdAt e updatedAt automaticamente
});

module.exports =  Ciclo ;
