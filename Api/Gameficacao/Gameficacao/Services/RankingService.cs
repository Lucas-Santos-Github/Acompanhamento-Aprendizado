using Gameficacao.models;
using Gameficacao.RankingApi;
using RankingApi.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace RankingApi.Services
{

    public class RankingService
    {
        #region [Testes de Conquistas]
        Func<Quiz, Ranking>[] RankingList =
            new Func<Quiz, Ranking>[]
            {
            q=> (q.tempoquiz.TotalDays > 0 && q.tempoquiz.TotalHours >-1 && q.tempoquiz.TotalSeconds >-1 && q.tempoquiz.TotalMinutes >-1 && q.tempoquiz.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*10,
               Id= q.idaluno
           } : null!,
           q=> (q.tempoquiz.TotalDays <= 0  && q.tempoquiz.TotalHours > 0 && q.tempoquiz.TotalHours < 10 &&q.tempoquiz.TotalSeconds >-1 && q.tempoquiz.TotalMinutes >-1 && q.tempoquiz.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*30,

               Id= q.idaluno
           } : null!,
           q=> (q.tempoquiz.TotalDays <= 0  && q.tempoquiz.TotalHours > 9 && q.tempoquiz.TotalSeconds >-1 && q.tempoquiz.TotalMinutes >-1 && q.tempoquiz.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*20,
              Id= q.idaluno
           } : null!,
            q=> (q.tempoquiz.TotalDays <= 0  && q.tempoquiz.TotalHours <= 0 && q.tempoquiz.TotalSeconds >-1 && q.tempoquiz.TotalMinutes > 0 && q.tempoquiz.TotalMinutes < 30 && q.tempoquiz.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*50,

             Id= q.idaluno
           } : null!,
           q=> (q.tempoquiz.TotalDays <= 0  && q.tempoquiz.TotalHours <= 0 && q.tempoquiz.TotalSeconds >-1 && q.tempoquiz.TotalMinutes > 29 && q.tempoquiz.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*60,

                Id= q.idaluno
           } : null!,
           q=> (q.tempoquiz.TotalDays <= 0  && q.tempoquiz.TotalHours <= 0 && q.tempoquiz.TotalSeconds >0 && q.tempoquiz.TotalMinutes <=0 && q.tempoquiz.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal*70,

            Id= q.idaluno
           } : null!,
           q=> (q.tempoquiz.TotalDays <= 0  && q.tempoquiz.TotalHours <= 0 && q.tempoquiz.TotalSeconds <=0 && q.tempoquiz.TotalMinutes <=0 && q.tempoquiz.TotalMilliseconds >-1) ? new Ranking
           {
               Nota = q.NotaTotal,

             Id= q.idaluno
           } : null!,

        }!;
        #endregion

        public List<Ranking> GetTop10(Quiz[] quizzes)
        {
           
            var Results = new List<Ranking>();

            foreach (var Quiz in quizzes)
                Results.AddRange(this.RankingList.Select(func => func(Quiz))
                    .Where(o => o != null));

            return Results.GroupBy(o => new { o.Id, o.Nome }).Select(o => new Ranking
            {
                Id = o.Key.Id,
                Nome = o.Key.Nome,
                Nota = o.Sum(w => w.Nota)
            }).OrderByDescending(o => o.Nota).Take(10).ToList();
        }

    }
}