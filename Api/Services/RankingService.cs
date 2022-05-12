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
           q=> q.TempoTotal.TotalDays > 60 ? new Ranking
           {
                Nota = q.NotaTotal * 1,
                Nome= q.Nome
                
           } : null,

           q=> q.TempoTotal.TotalDays > 30 ? new Ranking
           {
               Nota = q.NotaTotal * 5,
                Nome= q.Nome
           } : null,

           q=> q.TempoTotal.TotalDays > 10 ? new Ranking
           {
               Nota = q.NotaTotal * 10,
                Nome= q.Nome
           } : null,

           q=> q.TempoTotal.TotalDays > 5 ? new Ranking
           {
               Nota = q.NotaTotal * 20,
                Nome= q.Nome
           } : null,

           q=> q.TempoTotal.TotalDays > 0 ? new Ranking
           {
               Nota = q.NotaTotal * 30
           } : null,

           q=> q.TempoTotal.TotalHours > 20 ? new Ranking
           {
               Nota = q.NotaTotal * 50
           } : null,

           q=> q.TempoTotal.TotalHours > 10 ? new Ranking
           {
               Nota = q.NotaTotal * 60
           } : null,

           q=> q.TempoTotal.TotalHours > 5 ? new Ranking
           {
               Nota = q.NotaTotal * 70
           } : null,

           q=> q.TempoTotal.TotalHours > 4 ? new Ranking
           {
               Nota = q.NotaTotal * 80
           } : null,
           q=> q.TempoTotal.TotalHours > 3 ? new Ranking
           {
               Nota = q.NotaTotal * 85
           } : null,
           q=> q.TempoTotal.TotalHours > 2 ? new Ranking
           {
               Nota = q.NotaTotal * 90
           } : null,
           q=> q.TempoTotal.TotalHours > 1? new Ranking
           {
               Nota = q.NotaTotal * 95
           } : null,
           q=> q.TempoTotal.TotalHours > 0? new Ranking
           {
               Nota = q.NotaTotal * 100
           } : null,
           q=> q.TempoTotal.TotalMinutes > 40? new Ranking
           {
               Nota = q.NotaTotal * 105
           } : null,
           q=> q.TempoTotal.TotalMinutes > 30? new Ranking
           {
               Nota = q.NotaTotal * 110
           } : null,
           q=> q.TempoTotal.TotalMinutes > 20? new Ranking
           {
               Nota = q.NotaTotal * 120,
                Nome= q.Nome
           } : null,
           q=> q.TempoTotal.TotalMinutes > 10? new Ranking
           {
               Nota = q.NotaTotal * 130,
                Nome= q.Nome
           } : null,
           q=> q.TempoTotal.TotalMinutes > 0? new Ranking
           {
               Nota = q.NotaTotal * 135,
                Nome= q.Nome
           } : null,

        };
        #endregion

        public List<Ranking> GetTop10(Quiz[] quizzes)
        {

            var Results = new List<Ranking>();

            foreach (var Quiz in quizzes)
                Results.AddRange(this.RankingList.Select(func => func(Quiz))
                    .Where(o => o != null));


            return Results.OrderByDescending(o=> o.Nota).Take(10).ToList();
        }

    }
}
