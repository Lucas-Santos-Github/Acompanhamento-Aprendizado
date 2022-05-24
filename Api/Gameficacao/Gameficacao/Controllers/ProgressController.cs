using Gameficacao.Extensions;
using Gameficacao.models;
using Gamificacao.models;
using Gamificacao.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RankingApi.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Gamificacao.Controllers
{
    [Authorize(Roles = "Aluno,Professor")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        readonly IConfiguration _configuration;
        HttpClient http;

        public ProgressController(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.http = new HttpClient() { BaseAddress = new Uri(this._configuration["Apis:quizzes"]) };
          

        }

        [HttpGet("progress")]
        public async Task<IActionResult> GetProgress()
        {
            this.http.SetExternalUserAuthenticationToken(User);
            var userId = int.Parse(User.Claims.FirstOrDefault(o => o.Type == "UserId")?.Value);

            var result = this.http.GetAsync($"Quiz/Resultado").Result;

            if (result.IsSuccessStatusCode)
            {
                var quizzes = JsonConvert.DeserializeObject<List<Quiz>>((await result.Content.ReadAsStringAsync()));
                quizzes = quizzes.Where(o=> o.idaluno == userId).ToList();


                if (quizzes.Any())
                {
                    var materias = quizzes.Select(materia => materia.materiaquiz)
                            .Distinct()
                            .Select(o => new Materia
                            {
                                MateriaId = o,
                                Quizzes = (from quiz in quizzes
                                           where quiz.materiaquiz == o
                                           group quiz by quiz.materiaquiz into QuizzesPorMateria
                                           select QuizzesPorMateria).SelectMany(o => o).ToList()

                            }).ToList();


                    return Ok(new ProgressService().GetProgress(materias));

                }

            }

            return Ok(new object[] {});

        }


    }
}
