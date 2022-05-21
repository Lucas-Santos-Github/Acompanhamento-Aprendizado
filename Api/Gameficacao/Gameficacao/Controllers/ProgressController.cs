using Gamificacao.models;
using Gamificacao.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("progress/{userId}")]
        public async Task<IActionResult> GetProgress(int userId)
        {
            // Pegar lista de materias com quizes do usuario {userId}

            const string quizApi = "https://masterquizapi.herokuapp.com/api/";

            HttpClient http = new HttpClient() { BaseAddress = new Uri(quizApi) };

            var result = http.GetAsync($"Quiz/Resultado/{userId}").Result;

            if (result.IsSuccessStatusCode)
            {
                var quizzes = JsonConvert.DeserializeObject<List<Quiz>>((await result.Content.ReadAsStringAsync()));


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

            return NotFound("Usuario não encontrado");

        }


    }
}
