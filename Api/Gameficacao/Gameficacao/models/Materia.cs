using RankingApi.Context;
using System.Collections.Generic;

namespace Gamificacao.models
{
    // Modelo de retorno dos Quizes
    // 5 matérias, 3 niveis

    public class Materia
    {
        public int MateriaId { get; set; }
        public List<Quiz> Quizzes { get; set; }
    }
}
