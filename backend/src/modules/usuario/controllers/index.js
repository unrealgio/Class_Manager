const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const axios = require("axios");
const { Turma, Ciclo, Avaliacao } = require("../../turma/models");
const { Usuario, UsuarioTurma } = require("../../usuario/models");

// Login do usuário
const autenticarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

        let usuario = await Usuario.findOne({ where: { email } });

        // Verificar a API externa para atualizar os dados do professor
        const apiResponse = await axios.get(process.env.URL);
        const usuariosApi = apiResponse.data;
        const usuarioApi = usuariosApi.find((u) => u.email === email);

        if (!usuarioApi) {
            return res.status(404).json({ error: "Usuário não encontrado na API externa." });
        }

        // Se o usuário não existe localmente, criar um novo
        if (!usuario) {
            const senhaPadrao = process.env.SENHA_PADRAO;
            const senhaHasheada = await bcrypt.hash(senhaPadrao, 10);

            usuario = await Usuario.create({
                nome: usuarioApi.nome,
                email: usuarioApi.email,
                senha: senhaHasheada,
                tipo: usuarioApi.tipo,
                precisaAlterarSenha: true,
            });

            if (usuarioApi.tipo === "professor") {
                await sincronizarDadosDoProfessor(usuarioApi, usuario.id);
            } else if (usuarioApi.tipo === "aluno") {
                await sincronizarDadosDoAluno(usuarioApi, usuario.id);
            }
        } else {
            // Se o usuário já existe, atualizar os dados com base na API externa
            usuario.nome = usuarioApi.nome;
            usuario.tipo = usuarioApi.tipo;
            await usuario.save();

            if (usuarioApi.tipo === "professor") {
                await sincronizarDadosDoProfessor(usuarioApi, usuario.id);
            } else if (usuarioApi.tipo === "aluno") {
                await sincronizarDadosDoAluno(usuarioApi, usuario.id);
            }
        }

        // Verificar a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo, nome: usuario.nome },
            process.env.SECRET_KEY,
            { expiresIn: "8h" }
        );

        if (usuario.precisaAlterarSenha) {
            return res.json({
                mensagem: "Primeiro acesso: é necessário alterar a senha.",
                precisaAlterarSenha: true,
                token,
            });
        }

        res.json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro no servidor", detalhes: error.message });
    }
};

// Alterar senha no primeiro acesso
const alterarSenha = async (req, res) => {
    const { novaSenha } = req.body;

    try {
        const usuarioId = req.usuario.id;
        const usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        if (!novaSenha || novaSenha.length < 8 || novaSenha.length > 15) {
            return res.status(400).json({ error: "A nova senha deve ter entre 8 e 15 caracteres." });
        }

        usuario.senha = await bcrypt.hash(novaSenha, 10);
        usuario.precisaAlterarSenha = false;
        await usuario.save();

        res.json({ mensagem: "Senha alterada com sucesso." });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao alterar a senha." });
    }
};

// Obter perfil do usuário autenticado
const obterPerfil = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const usuario = await Usuario.findByPk(usuarioId, {
            attributes: ["id", "nome", "email", "tipo"],
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json({ usuario });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao obter o perfil do usuário." });
    }
};

// Sincronizar dados do professor
const sincronizarDadosDoProfessor = async (usuarioApi, usuarioId) => {
    const turmas = usuarioApi.turmas;

    for (const turmaApi of turmas) {
        const [turma] = await Turma.upsert({
            cod: turmaApi.cod,
            nome: turmaApi.nome,
            cargaHoraria: turmaApi.cargaHoraria,
            horaAula: turmaApi.horaAula,
            dataInicio: turmaApi.dataInicio,
            dataFim: turmaApi.dataFim,
            unidadeOperativa: turmaApi.unidadeOperativa,
        }, { returning: true });

        await UsuarioTurma.findOrCreate({
            where: { usuarioId, turmaId: turma.id },
            defaults: { tipoRelacao: 'professor' },
        });

        for (const cicloApi of turmaApi.ciclos) {
            await Ciclo.upsert({
                nome: cicloApi.nome,
                turmaId: turma.id,
            });
        }
    }
};

// Sincronizar dados do aluno
const sincronizarDadosDoAluno = async (usuarioApi, usuarioId) => {
    const turmas = usuarioApi.turmas;

    for (const turmaApi of turmas) {
        const [turma] = await Turma.upsert({
            cod: turmaApi.cod,
            nome: turmaApi.nome,
            cargaHoraria: turmaApi.cargaHoraria,
            horaAula: turmaApi.horaAula,
            dataInicio: turmaApi.dataInicio,
            dataFim: turmaApi.dataFim,
            unidadeOperativa: turmaApi.unidadeOperativa,
        }, { returning: true });

        await UsuarioTurma.findOrCreate({
            where: { usuarioId, turmaId: turma.id },
            defaults: { tipoRelacao: 'aluno' },
        });

        for (const cicloApi of turmaApi.ciclos) {
            await Ciclo.upsert({
                nome: cicloApi.nome,
                turmaId: turma.id,
            });
        }
    }
};

// Obter turmas do usuário (professor)
// Obter turmas do usuário (professor)
const obterTurmasUsuario = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const turmas = await Turma.findAll({
            include: [
                {
                    model: Usuario,
                    as: "usuarios",
                    where: { id: usuarioId },
                    through: { attributes: [] },
                    attributes: ["id", "nome", "email", "tipo", "precisaAlterarSenha"], // 🔹 Remove o campo "senha"
                },
            ],
        });

        res.status(200).json(turmas);
    } catch (error) {
        console.error(`Erro ao buscar turmas do usuário: ${error.message}`);
        res.status(500).json({ error: "Erro ao buscar turmas do usuário." });
    }
};


// Listar turmas de um aluno
const listarTurmasAluno = async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
        const usuario = await Usuario.findByPk(usuarioId, {
            include: { model: Turma, as: "turmas" },
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(200).json(usuario.turmas);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao buscar turmas do aluno." });
    }
};

// Listar ciclos de um aluno
const listarCiclosAluno = async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
        const usuario = await Usuario.findByPk(usuarioId, {
            include: {
                model: Turma,
                as: "turmas",
                include: { model: Ciclo, as: "ciclos" },
            },
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const ciclos = usuario.turmas.flatMap((turma) => turma.ciclos);
        res.status(200).json(ciclos);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao buscar ciclos do aluno." });
    }
};

// Listar notas do aluno
const listarNotasAluno = async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
        const usuario = await Usuario.findByPk(usuarioId, {
            include: { model: Avaliacao, as: "avaliacoes" },
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(200).json(usuario.avaliacoes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao buscar notas do aluno." });
    }
};

module.exports = {
    autenticarUsuario,
    alterarSenha,
    obterPerfil,
    sincronizarDadosDoProfessor,
    sincronizarDadosDoAluno,
    obterTurmasUsuario,
    listarTurmasAluno,
    listarCiclosAluno,
    listarNotasAluno,
};
