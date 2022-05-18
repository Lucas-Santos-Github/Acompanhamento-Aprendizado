using Gamificacao.models;
using Gamificacao.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RankingApi.Context;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gamificacao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {

        [HttpGet("progress/{userId}")]
        public async Task<IActionResult> GetProgress(int userId)
        {
            // Pegar lista de materias com quizes do usuario {userId}
            var materias = new List<Materia>()
            {

                  new Materia
                  {
                       NomeMateria = "POO",
                       Quizzes = new List<Quiz>()
                       {
                           new Quiz()
                           {
                               qtdacertos = 6,
                               qttperguntas = 10
                           },
                           new Quiz()
                           {
                               qtdacertos = 9,
                               qttperguntas = 10
                           },
                           new Quiz()
                           {
                               qtdacertos = 4,
                               qttperguntas = 10
                           }
                       }
                  },
                     new Materia
                  {
                       NomeMateria = "AED",
                       Quizzes = new List<Quiz>()
                       {
                           new Quiz()
                           {
                               qtdacertos = 4,
                               qttperguntas = 10
                           },
                           new Quiz()
                           {
                               qtdacertos = 3,
                               qttperguntas = 10
                           },
                           new Quiz()
                           {
                               qtdacertos = 0,
                               qttperguntas = 10
                           }
                       }
                  },

                   new Materia
                  {
                       NomeMateria = "ATP",
                       Quizzes = new List<Quiz>()
                       {
                           new Quiz()
                           {
                               qtdacertos = 10,
                               qttperguntas = 10
                           },
                           new Quiz()
                           {
                               qtdacertos = 9,
                               qttperguntas = 10
                           },
                           new Quiz()
                           {
                               qtdacertos = 8,
                               qttperguntas = 10
                           }
                       }
                  },



            };


            return Ok(new ProgressService().GetProgress(materias));
        }


    }
}
