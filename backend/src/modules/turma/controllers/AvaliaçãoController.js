const Avaliacao = require("../models/Avaliacao");
const Turma = require("../models/Turma");
const Usuario = require("../../usuario/models/Usuario");

// Lista as notas dos alunos (Dashboard Professor)
const listarNotasAlunos = async (req, res) => {
  const { turmaId } = req.params;

  try {
    const turma = await Turma.findByPk(turmaId, {
      include: {
        model: Usuario,
        as: "usuarios",
        through: { attributes: [] },
        include: {
          model: Avaliacao,
          as: "avaliacoes",
        },
      },
    });

    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada" });
    }

    // Filtra apenas os alunos e remove informações sensíveis
    const alunosComNotas = turma.usuarios
      .filter((usuario) => usuario.tipo === "aluno")
      .map((aluno) => ({
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        avaliacoes: aluno.avaliacoes.map((avaliacao) => ({
          id: avaliacao.id,
          tipo: avaliacao.tipo,
          criterios: avaliacao.criterios,
          cicloId: avaliacao.cicloId,
          alunoId: avaliacao.alunoId,
        })),
      }));

    res.json(alunosComNotas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar notas dos alunos" });
  }
};

// Edita a nota do aluno (Dashboard Professor)
const editarNotaAluno = async (req, res) => {
  const { avaliacaoId } = req.params;
  const criterios = req.body;

  try {
    const avaliacao = await Avaliacao.findByPk(avaliacaoId);
    if (!avaliacao) {
      return res.status(404).json({ error: "Avaliação não encontrada" });
    }

    await avaliacao.update({ criterios });
    res.json({ message: "Nota atualizada com sucesso", avaliacao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao editar nota do aluno" });
  }
};

// Cria a nota do aluno (Dashboard Professor)
const criarNotaAluno = async (req, res) => {
  try {
    const body = req.body;

    // Validação para garantir que todos os campos obrigatórios estão presentes
    if (!body.cicloId || !body.alunoId || !body.tipo || !body.criterios) {
      return res.status(400).json({ error: "Dados incompletos para criar a avaliação" });
    }

    const newAvaliacao = await Avaliacao.create(body);
    res.status(201).json({ message: "Nota criada com sucesso", newAvaliacao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar nota do aluno" });
  }
};

module.exports = {
  editarNotaAluno,
  criarNotaAluno,
  listarNotasAlunos,
};
