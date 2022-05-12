#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RankingApi.Services;
using RankingApi.Context;

namespace RankingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RankingController : ControllerBase
    {
         #region [Quizzes que virão da api]
        private  readonly Quiz[] quizes = new Quiz[]
        {
            new Quiz
            {
                NotaTotal= 10,
                TempoTotal=new TimeSpan(1,60,0),
            },
            new Quiz
            {
                NotaTotal= 10,
                TempoTotal=new TimeSpan(0,60,0),
            },
            new  Quiz
            {
                NotaTotal= 10,
                TempoTotal=new TimeSpan(0,20,0),
            },
            new  Quiz
            {
                NotaTotal= 10,
                TempoTotal=new TimeSpan(0,0,50),
            },
            new  Quiz
            {
                NotaTotal= 10,
                TempoTotal=new TimeSpan(0,20,0),
            },
            new  Quiz
            {
                Id=10000,
                Nome="Fulano",
                NotaTotal= 100,
                TempoTotal=new TimeSpan(0,10,10),
            }
        };
        #endregion
        [HttpGet("userranking")]
        public IEnumerable<Ranking> UserRanking()
        {
            var quizzes = this.quizes;
            return new RankingService().GetTop10(quizzes);
        }
    }
}
