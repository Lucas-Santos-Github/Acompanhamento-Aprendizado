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
using Microsoft.Extensions.Configuration;
using Gameficacao.Extensions;
using Gameficacao.models;

namespace RankingApi.Controllers
{
    [Authorize(Roles = "Aluno,Professor")]
    [Route("api/[controller]")]
    [ApiController]
    public class RankingController : ControllerBase
    {
        readonly IConfiguration _configuration;
        HttpClient http;

        public RankingController(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.http = new HttpClient() { BaseAddress = new Uri(this._configuration["Apis:quizzes"]) };


        }

        [HttpGet("Ranking")]
        public async Task<IActionResult> Ranking()
        {
            string userId = "1" ?? (User.Claims.FirstOrDefault(o => o.Type == "UserId")?.Value ?? "1");

            this.http.SetExternalUserAuthenticationToken(User);
            var result = http.GetAsync($"Quiz/Resultado/{userId}").Result;

            if (result.IsSuccessStatusCode)
            {

                var quizzes = JsonConvert.DeserializeObject<Quiz[]>((await result.Content.ReadAsStringAsync()));

                return Ok(new RankingService().GetTop10(quizzes));
            }

            return StatusCode((int)result.StatusCode, result.RequestMessage);
        }
    }
}
