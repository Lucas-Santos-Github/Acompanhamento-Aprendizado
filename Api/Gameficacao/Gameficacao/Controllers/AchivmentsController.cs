using Apiconquista.Services;
using Gamificacao.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RankingApi.Context;
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
        readonly IConfiguration _config;
        public AchivmentsController(IConfiguration configuration)
        {
            this._config = configuration;
        }


        #region [Quizzes que virão da api]
        private readonly Quiz[] Quizes = new Quiz[]
        {
            new Quiz
            {
                qtdacertos=10,
                qttperguntas=12,
                tempgasto=new TimeSpan(1,50,0),
            },
              new Quiz
            {
                qtdacertos=10,
                qttperguntas=12,
                tempgasto=new TimeSpan(0,0,59),
            },
                new  Quiz
            {
                qtdacertos=12,
                qttperguntas=12,
                tempgasto=new TimeSpan(1,50,0),
            },
                  new  Quiz
            {
                qtdacertos=12,
                qttperguntas=12,
                tempgasto=new TimeSpan(0,0,60),
            },
                    new  Quiz
            {
                qtdacertos=0,
                qttperguntas=12,
                tempgasto=new TimeSpan(1,50,0),
            },
                             new  Quiz
            {
                qtdacertos=0,
                qttperguntas=12,
                tempgasto=new TimeSpan(2,0,0),
            }
        };
        #endregion



        [HttpGet("userachitivments")]
        public async Task<IActionResult> UserAchitivments()
        {
            //const string auth = "http://victorgontijo-001-site1.htempurl.com/api/";
            //const string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMCIsImVtYWlsIjoiUHJvZmVzc29yIiwicm9sZSI6IlByb2Zlc3NvciIsInVuaXF1ZV9uYW1lIjoiUHJvZmVzc29yIiwiR2VuZXJvIjoiT3V0cm9zIiwiTEdQRCI6IlRydWUiLCJOYXNjaW1lbnRvIjoiNS8xMi8yMDIyIDM6NTU6MDIgQU0iLCJuYmYiOjE2NTI4MzM5NDIsImV4cCI6MTY1Mjg2Mjc0MiwiaWF0IjoxNjUyODMzOTQyfQ.gE-uNs3qMv1-RqsoaiI8qML0Nx2hsFQhz0hAaCpD05c";

            //HttpClient client = new HttpClient() { BaseAddress = new Uri(auth) };

            //client.DefaultRequestHeaders.Add("Authorization",$"Bearer {token}");
            //var resultContent = (await client.GetAsync($"Usuario/{userId}"));

            //var usuario = resultContent.Content.ReadAsStringAsync().Result;

            //var usuario = await resultContent.ReadAsStringAsync();

            // Pegar os quizes deste usuario {userId}
            var Quizzes = this.Quizes;

            return Ok(new AchivmentService().GetAchviments(Quizzes));
        }





    }
}
