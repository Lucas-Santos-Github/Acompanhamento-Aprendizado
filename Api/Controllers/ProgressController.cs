using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace ProgressoUsuario.Controllers
{
    [Route("api/[controller]/progress")]
    [ApiController]
    public class ProgressController : ControllerBase
    {


        // Modelo de retorno dos quizes
        // 5 matérias, 3 niveis

        public class quiz
        {
            public int qtdacertos;
            public int qttperguntas;
            public TimeSpan tempgasto;
        }

        class Materia
        {
            public string NomeMateria { get; set; }
            public List<quiz> Quizzes { get; set; }
        }





        [HttpGet("userprogress")]
        public async Task<IActionResult> GetUserProgress(int UserID)
        {

            // ----------

            var materias = new List<Materia>()
            {

                  new Materia
                  {
                       NomeMateria = "POO",
                       Quizzes = new List<quiz>()
                       {
                           new quiz()
                           {
                               qtdacertos = 6,
                               qttperguntas = 10
                           },
                           new quiz()
                           {
                               qtdacertos = 9,
                               qttperguntas = 10
                           },
                           new quiz()
                           {
                               qtdacertos = 4,
                               qttperguntas = 10
                           }
                       }
                  },
                     new Materia
                  {
                       NomeMateria = "AED",
                       Quizzes = new List<quiz>()
                       {
                           new quiz()
                           {
                               qtdacertos = 4,
                               qttperguntas = 10
                           },
                           new quiz()
                           {
                               qtdacertos = 3,
                               qttperguntas = 10
                           },
                           new quiz()
                           {
                               qtdacertos = 0,
                               qttperguntas = 10
                           }
                       }
                  },

                   new Materia
                  {
                       NomeMateria = "ATP",
                       Quizzes = new List<quiz>()
                       {
                           new quiz()
                           {
                               qtdacertos = 10,
                               qttperguntas = 10
                           },
                           new quiz()
                           {
                               qtdacertos = 9,
                               qttperguntas = 10
                           },
                           new quiz()
                           {
                               qtdacertos = 8,
                               qttperguntas = 10
                           }
                       }
                  },



            };
           // ----------


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


           

            return Ok(new ProgressResult()
            {
                currentExp = totalPtsObtidos,
                totalExp = totalPtsPossiveis,
                currentRanking = rankings.RankingAtual,
                nextRanking = rankings.ProximoRanking ?? "Concluido"
            });
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
