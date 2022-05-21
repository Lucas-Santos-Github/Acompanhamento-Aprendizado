using Apiconquista.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RankingApi.Context;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Gameficacao.Extensions;
using Gameficacao.models;

namespace Gamificacao.Controllers
{
    [Authorize(Roles = "Aluno,Professor")]
    [ApiController]
    [Route("api/[controller]/")]
    public class AchivmentsController : ControllerBase
    {

        readonly IConfiguration _configuration;
        HttpClient http;

        public AchivmentsController(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.http = new HttpClient() { BaseAddress = new Uri(this._configuration["Apis:quizzes"]) };
        }


        [HttpGet("userachitivments/{userId}")]
        public async Task<IActionResult> UserAchitivments(int userId)
        {
            this.http.SetExternalUserAuthenticationToken(User);
            var resultContent = (await this.http.GetAsync($"Quiz/Resultado/{userId}"));

            if (resultContent.IsSuccessStatusCode)
            {
                var Quizzes = JsonConvert.DeserializeObject<Quiz[]>(resultContent.Content.ReadAsStringAsync().Result);

                return Ok(new AchivmentService().GetAchviments(Quizzes));
            }

            return StatusCode((int)resultContent.StatusCode, resultContent.RequestMessage);

        }





    }
}
