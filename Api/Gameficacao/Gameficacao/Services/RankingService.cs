using Gameficacao.RankingApi;
using RankingApi.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RankingApi.Services
{

    public class RankingService
    {

        #region [Testes de Conquistas]
        Func<Quiz, Ranking>[] RankingList =
            new Func<Quiz, Ranking>[]
            {
            q=> (q.TempoTotal.TotalDays > 0 && q.TempoTotal.TotalHours >-1 && q.TempoTotal.TotalSeconds >-1 && q.TempoTotal.TotalMinutes >-1 && q.TempoTotal.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*10,
               Nome = q.Nome,
               Id= q.Id
           } : null!,
           q=> (q.TempoTotal.TotalDays <= 0  && q.TempoTotal.TotalHours > 0 && q.TempoTotal.TotalHours < 10 &&q.TempoTotal.TotalSeconds >-1 && q.TempoTotal.TotalMinutes >-1 && q.TempoTotal.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*30,
               Nome = q.Nome,
               Id= q.Id
           } : null!,
           q=> (q.TempoTotal.TotalDays <= 0  && q.TempoTotal.TotalHours > 9 && q.TempoTotal.TotalSeconds >-1 && q.TempoTotal.TotalMinutes >-1 && q.TempoTotal.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*20,
               Nome = q.Nome,
               Id= q.Id
           } : null!,
            q=> (q.TempoTotal.TotalDays <= 0  && q.TempoTotal.TotalHours <= 0 && q.TempoTotal.TotalSeconds >-1 && q.TempoTotal.TotalMinutes > 0 && q.TempoTotal.TotalMinutes < 30 && q.TempoTotal.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*50,
               Nome = q.Nome,
               Id= q.Id
           } : null!,
           q=> (q.TempoTotal.TotalDays <= 0  && q.TempoTotal.TotalHours <= 0 && q.TempoTotal.TotalSeconds >-1 && q.TempoTotal.TotalMinutes > 29 && q.TempoTotal.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*60,
               Nome = q.Nome,
               Id= q.Id
           } : null!,
           q=> (q.TempoTotal.TotalDays <= 0  && q.TempoTotal.TotalHours <= 0 && q.TempoTotal.TotalSeconds >0 && q.TempoTotal.TotalMinutes <=0 && q.TempoTotal.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*70,
               Nome = q.Nome,
               Id= q.Id
           } : null!,
           q=> (q.TempoTotal.TotalDays <= 0  && q.TempoTotal.TotalHours <= 0 && q.TempoTotal.TotalSeconds <=0 && q.TempoTotal.TotalMinutes <=0 && q.TempoTotal.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal,
               Nome = q.Nome,
               Id= q.Id
           } : null!,

        }!;
        #endregion

        public List<Ranking> GetTop10(Quiz[] quizzes)
        {

            var Results = new List<Ranking>();

            foreach (var Quiz in quizzes)
                Results.AddRange(this.RankingList.Select(func => func(Quiz))
                    .Where(o => o != null));


            return Results.OrderByDescending(o => o.Nota).Take(10).ToList();
        }

    }
}