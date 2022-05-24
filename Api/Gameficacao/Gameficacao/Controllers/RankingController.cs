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
using Gameficacao.RankingApi;

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
            this.http.SetExternalUserAuthenticationToken(User);
            var result = http.GetAsync($"Quiz/Resultado").Result;

            if (result.IsSuccessStatusCode)
            {

                var quizzes = JsonConvert.DeserializeObject<Quiz[]>((await result.Content.ReadAsStringAsync()));
                var topTen = new RankingService().GetTop10(quizzes);

                var t = FillRestOfFields(topTen);

                return Ok(t);
            }

            return StatusCode((int)result.StatusCode, result.RequestMessage);
        }

        List<Ranking> FillRestOfFields(List<Ranking> quiz)
        {
            string autenticacaoUrl = this._configuration["Apis:auteticacao"];
            var http = new HttpClient { BaseAddress = new Uri(autenticacaoUrl) };
            http.SetExternalUserAuthenticationToken(User);

            foreach (var item in quiz)
            {
                var result = http.GetAsync($"Usuario/{item.Id}").Result;
                if (result.IsSuccessStatusCode)
                {
                    var aluno = JsonConvert.DeserializeObject<ExtUsuario>(result.Content.ReadAsStringAsync().Result);
                    item.Nome = aluno.nome;
                }

                item.Nome ??= "Usuário desconhecido";
            }

            return quiz;
        }


    }
}
