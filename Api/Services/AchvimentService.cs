using Gamificacao.models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Gamificacao.Services
{

    public class AchivmentService
    {

     

        #region [Testes de Conquistas]
        Func<quiz, Achivment>[] AchivmentsList =
            new Func<quiz, Achivment>[]
        {
           q=> q.qtdacertos == q.qttperguntas ? new Achivment
           {
                description = "Acertou todas as perguntas",
                title = "O sabe tudo",
                icon = "https://2.bp.blogspot.com/_U6v9CkCPQxM/TPaZ7RqoI7I/AAAAAAAAARk/7E7lSpkzvIg/s1600/chuck_norris-unisanta.jpg"
           } : null,

           q=> q.qtdacertos == 0? new Achivment
           {
               description = "Errou todas as questões",
               title = "Sabe nada",
                icon = "fodasdas"
           } : null,

           q=> q.tempgasto.TotalSeconds < 60 ? new Achivment
           {
               description="Terminou um quiz em menos de 60s",
               title="Matador de quiz",
               icon =  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Trof%C3%A9u_de_NFA.svg/1200px-Trof%C3%A9u_de_NFA.svg.png"


           } : null,

           q=>q.tempgasto.TotalSeconds > 60*60 ? new Achivment
           {
              description="Demorou mais de 1 hora para terminar o quiz",
              title="Mais rapido da proxima vez",
              icon="oi"

           } : null,

           q=> q.qtdacertos == q.qttperguntas && q.tempgasto.TotalSeconds == 60? new Achivment
           {
               description = "Selo dlç",
               title = "Deixou o oco no aprendizado",
               icon = "jailson"
           } : null

        };
        #endregion

        public List<Achivment> GetAchviments(quiz[] quizzes)
        {

            var achivments = new List<Achivment>();

            foreach (var quiz in quizzes)
                achivments.AddRange(this.AchivmentsList.Select(func => func(quiz))
                    .Where(o => o != null));


            return achivments.Distinct().ToList();
        }

    }
}
