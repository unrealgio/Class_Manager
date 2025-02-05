const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../../config/configDb');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('professor', 'aluno'),
        allowNull: false,
    },
    precisaAlterarSenha: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Define como true por padrão
    },
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.senha && !usuario.senha.startsWith('$2b$')) { // Verifica se a senha já está hashada
                const salt = await bcrypt.genSalt(10);
                usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('senha') && !usuario.senha.startsWith('$2b$')) { // Evita re-hashear hashes existentes
                const salt = await bcrypt.genSalt(10);
                usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        },
    },
    tableName: 'Usuarios',
});

module.exports = Usuario;