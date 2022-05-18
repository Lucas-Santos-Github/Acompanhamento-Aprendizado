using Gamificacao.models;
using ProgressoUsuario;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Gamificacao.Services
{
    public class ProgressService
    {

        public ProgressResult GetProgress(List<Materia> materias)
        {
            var PontuacaoMateria = (from m in materias
                                    select new
                                    {
                                        TotalPts = (m.Quizzes.Sum(o => o.qtdacertos)
                                        * 100) / m.Quizzes.Sum(o => o.qttperguntas),

                                        m.NomeMateria
                                    });


            int totalPtsPossiveis = materias.Sum(o => (int)Math.Round(o.Quizzes.Sum(w => (double)w.qttperguntas * 3.3), 2)),

            totalPtsObtidos = PontuacaoMateria.Sum(o => o.TotalPts);

            var rankings = GetRanking(totalPtsObtidos, totalPtsPossiveis);


            return new ProgressResult()
            {
                currentExp = totalPtsObtidos,
                totalExp = totalPtsPossiveis,
                currentRanking = rankings.RankingAtual,
                nextRanking = rankings.ProximoRanking ?? "Concluido"
            };

        }


        //Alocando em um Nivel de progresso de 1 ao 5
        (string RankingAtual, string? ProximoRanking) GetRanking(int ptsObtidos, int totalPtsPossiveis)
        {
            var t = Math.Floor((double)((ptsObtidos * 5) / totalPtsPossiveis));

            switch (t)
            {
                case 1: return ("Ranking 1", "Ranking 2");
                case 2: return ("Ranking 2", "Ranking 3");
                case 3: return ("Ranking 3", "Ranking 4");
                case 4: return ("Ranking 4", "Ranking 5 ");
                case 5: return ("Ranking 5", default);

                default:
                    return (default, default);

            }

        }
    }
}
