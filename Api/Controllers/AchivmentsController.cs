using Gamificacao.models;
using Gamificacao.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Gamificacao.Controllers
{
    [ApiController]
    [Route("api/[controller]/")]
    public class AchivmentsController : ControllerBase
    {
       
        #region [Quizzes que virão da api]
        private  readonly quiz[] quizes = new quiz[]
        {
            new quiz
            {
                qtdacertos=10,
                qttperguntas=12,
                tempgasto=new TimeSpan(1,50,0),
            },
              new quiz
            {
                qtdacertos=10,
                qttperguntas=12,
                tempgasto=new TimeSpan(0,0,59),
            },
                new  quiz
            {
                qtdacertos=12,
                qttperguntas=12,
                tempgasto=new TimeSpan(1,50,0),
            },
                  new  quiz
            {
                qtdacertos=12,
                qttperguntas=12,
                tempgasto=new TimeSpan(0,0,60),
            },
                    new  quiz
            {
                qtdacertos=0,
                qttperguntas=12,
                tempgasto=new TimeSpan(1,50,0),
            },
                             new  quiz
            {
                qtdacertos=0,
                qttperguntas=12,
                tempgasto=new TimeSpan(2,0,0),
            }
        };
        #endregion



        [HttpGet("userachitivments")]
        public IEnumerable<Achivment> UserAchitivments()

        {
            var quizzes = this.quizes;
            return new AchivmentService().GetAchviments(quizzes);
        }


        


    }
}
