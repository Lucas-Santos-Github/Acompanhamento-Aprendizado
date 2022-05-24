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
                                        TotalPts = (m.Quizzes.Sum(o => o.questoescorretas)
                                        * 100) / m.Quizzes.Sum(o => o.quantidadequestoes),

                                        m.MateriaId
                                    });


            int totalPtsPossiveis = materias.Sum(o => (int)Math.Round(o.Quizzes.Sum(w => (double)w.quantidadequestoes * 3.3), 2)),

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
                case 1: return ("Nível 1 - Santoryou", "Nível 2 - Verme Maldito");
                case 2: return ("Nível 2 - Verme maldito", "Nível 3 - Rap Monkey");
                case 3: return ("Nível 3 - Rap Monkey", "Nível 4 - Instinto Superior");
                case 4: return ("Nível 4 - Instinto Superior", "Nível 5 - Kyubbi Sennin Mode");
                case 5: return ("Nível 5 - Kyubbi Sennin Mode", default);

                default:
                    return (default, default);

            }

        }
    }
}
