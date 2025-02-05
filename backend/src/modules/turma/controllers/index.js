const Turma = require('../models/Turma');
const Ciclo = require('../models/Ciclo');

//cria a turma (dashboard professor)
const criarTurma = async (req, res) => {
    const { cod, nome, cargaHoraria, horaAula, dataInicio, dataFim, unidadeOperativa, ciclos } = req.body;

    try {
        const novaTurma = await Turma.create({
            cod,
            nome,
            cargaHoraria,
            horaAula,
            dataInicio,
            dataFim,
            unidadeOperativa,
        });

        if (ciclos && ciclos.length > 0) {
            const ciclosCriados = await Promise.all(
                ciclos.map(ciclo => Ciclo.create({ ...ciclo, turmaId: novaTurma.id }))
            );
            novaTurma.ciclos = ciclosCriados;
        }

        res.status(201).json(novaTurma);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar turma' });
    }
};

module.exports = {
    criarTurma,
};