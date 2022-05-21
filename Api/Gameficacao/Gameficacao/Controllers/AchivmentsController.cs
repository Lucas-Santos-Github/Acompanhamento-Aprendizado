using Apiconquista.Services;
using Gamificacao.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RankingApi.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Gamificacao.Controllers
{
    [Authorize(Roles = "Aluno,Professor")]
    [ApiController]
    [Route("api/[controller]/")]
    public class AchivmentsController : ControllerBase
    {
        readonly IConfiguration _config;
        public AchivmentsController(IConfiguration configuration)
        {
            this._config = configuration;
        }




        [HttpGet("userachitivments/{userId}")]
        public async Task<IActionResult> UserAchitivments(int userId)
        {
            const string auth = "https://masterquizapi.herokuapp.com/api/";

            HttpClient client = new HttpClient() { BaseAddress = new Uri(auth) };

            var resultContent = (await client.GetAsync($"Quiz/Resultado/{userId}"));

            if (resultContent.IsSuccessStatusCode)
            {
                var Quizzes = JsonConvert.DeserializeObject<Quiz[]>(resultContent.Content.ReadAsStringAsync().Result);

                return Ok(new AchivmentService().GetAchviments(Quizzes));
            }

            return StatusCode((int)resultContent.StatusCode, resultContent.RequestMessage);

        }





    }
}
