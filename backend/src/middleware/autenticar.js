const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const autenticar = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = decoded; // Adiciona os dados do token (id, tipo) ao request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};

module.exports = autenticar;