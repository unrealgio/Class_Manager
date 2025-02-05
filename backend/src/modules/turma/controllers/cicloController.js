const { Ciclo } = require("../models/index.js");

// Lista os ciclos de uma turma (dashboard professor)
const listarCiclosTurma = async (req, res) => {
  const { turmaId } = req.params;

  try {
    if (!turmaId) {
      return res.status(400).json({ error: "O ID da turma é obrigatório." });
    }

    const ciclos = await Ciclo.findAll({
      where: { turmaId },
    });

    if (ciclos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum ciclo encontrado para a turma especificada." });
    }

    res.status(200).json(ciclos);
  } catch (error) {
    console.error(`Erro ao buscar ciclos da turma: ${error.message}`);
    res.status(500).json({ error: "Erro ao buscar ciclos da turma." });
  }
};

module.exports = {
  listarCiclosTurma,
};
