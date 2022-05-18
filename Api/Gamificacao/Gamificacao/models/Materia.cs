﻿using RankingApi.Context;

namespace Gamificacao.models
{
    // Modelo de retorno dos Quizes
    // 5 matérias, 3 niveis

    public class Materia
    {
        public string NomeMateria { get; set; }
        public List<Quiz> Quizzes { get; set; }
    }
}
