const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/configDb");
const Turma = require("../../turma/models/Turma");
const Usuario = require("../../usuario/models/Usuario");

const Frequencia = sequelize.define("Frequencia", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Usuarios",
      key: "id",
    },
  },
  turmaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Turmas",
      key: "id",
    },
  },
  presenca: {
    type: DataTypes.INTEGER, // 0 a 4
    allowNull: false,
    validate: {
      min: 0,
      max: 4,
    },
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Relacionamentos
Frequencia.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Frequencia.belongsTo(Turma, { foreignKey: "turmaId", as: "turma" });

module.exports = Frequencia;
