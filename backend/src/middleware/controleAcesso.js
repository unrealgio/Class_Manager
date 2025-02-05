// Middleware para verificar o tipo de usuário
const verificarTipoUsuario = (tipoPermitido) => {
    return (req, res, next) => {
        if (req.usuario.tipo !== tipoPermitido) {
            return res.status(403).json({ error: `Acesso negado. Apenas ${tipoPermitido}s podem acessar.` });
        }
        next();
    };
};

// Middleware para permitir múltiplos tipos de usuários
const verificarTiposUsuarios = (tiposPermitidos) => {
    return (req, res, next) => {
        if (!tiposPermitidos.includes(req.usuario.tipo)) {
            return res.status(403).json({
                error: `Acesso negado. Apenas os tipos de usuário permitidos: ${tiposPermitidos.join(', ')}.`,
            });
        }
        next();
    };
};

module.exports = {
    verificarTipoUsuario,
    verificarTiposUsuarios,
};
