#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RankingApi.Services;
using RankingApi.Context;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;

namespace RankingApi.Controllers
{
    [Authorize(Roles = "Aluno,Professor")]
    [Route("api/[controller]")]
    [ApiController]
    public class RankingController : ControllerBase
    {

        [HttpGet("Ranking")]
        public async Task<IActionResult> Ranking()
        {
            const string quizApi = "https://masterquizapi.herokuapp.com/api/";

            HttpClient http = new HttpClient() { BaseAddress = new Uri(quizApi) };

            var result = http.GetAsync($"Quiz/Resultado/{1}").Result;

            if (result.IsSuccessStatusCode)
            {
                var quizzes = JsonConvert.DeserializeObject<Quiz[]>((await result.Content.ReadAsStringAsync()))
                    ;

                return Ok(new RankingService().GetTop10(quizzes));
            }

            return StatusCode((int)result.StatusCode,result.RequestMessage);
        }
    }
}
