const Frequencia = require("../models/index.js");
const Turma = require("../../turma/models/Turma");
const Usuario = require("../../usuario/models/Usuario");

// Criar a frequência de múltiplos alunos em uma turma
const criarFrequencia = async (req, res) => {
  const { turmaId, data, alunosPresencas } = req.body;

  try {
    // Verificação dos campos obrigatórios
    if (!turmaId || !data || !alunosPresencas || !Array.isArray(alunosPresencas)) {
      return res.status(400).json({
        error: "turmaId, data e alunosPresencas (como array) são obrigatórios",
      });
    }

    // Verificar se a turma existe
    const turma = await Turma.findByPk(turmaId);
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada" });
    }

    // Criar frequência para cada aluno informado
    const frequenciasCriadas = [];
    for (const { alunoId, presenca } of alunosPresencas) {
      if (!alunoId || typeof presenca !== "number" || presenca < 0 || presenca > 4) {
        return res.status(400).json({
          error: "Cada aluno deve ter alunoId válido e presenca entre 0 e 4",
        });
      }

      // Verificar se o aluno existe
      const aluno = await Usuario.findByPk(alunoId);
      if (!aluno || aluno.tipo !== "aluno") {
        return res.status(404).json({ error: `Aluno com ID ${alunoId} não encontrado ou inválido` });
      }

      // Criar frequência
      const frequencia = await Frequencia.create({
        usuarioId: alunoId,
        turmaId,
        data,
        presenca,
      });
      frequenciasCriadas.push(frequencia);
    }

    res.status(201).json({
      mensagem: "Frequências criadas com sucesso",
      frequencias: frequenciasCriadas,
    });
  } catch (error) {
    console.error("Erro ao criar frequências:", error);
    res.status(500).json({ error: "Erro ao criar a frequência" });
  }
};

// Obter frequências de um usuário (aluno)
const obterFrequenciasUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "Id do usuário é obrigatório" });
    }

    const frequencias = await Frequencia.findAll({
      where: { usuarioId: id },
      include: [
        {
          model: Turma,
          as: "turma",
          attributes: ["id", "nome", "cod"],
        },
      ],
    });

    if (frequencias.length === 0) {
      return res.status(404).json({ error: "Frequências não encontradas" });
    }

    res.status(200).json(frequencias);
  } catch (error) {
    console.error("Erro ao obter frequências:", error);
    res.status(500).json({ error: "Erro ao buscar frequências" });
  }
};

module.exports = {
  criarFrequencia,
  obterFrequenciasUsuario,
};
