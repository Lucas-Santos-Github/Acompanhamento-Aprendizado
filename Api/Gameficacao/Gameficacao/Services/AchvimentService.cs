using Gamificacao.models;
using RankingApi.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Apiconquista.Services
{

    public class AchivmentService
    {



        #region [Testes de Conquistas]
        Func<Quiz, Achivment>[] AchivmentsList =
            new Func<Quiz, Achivment>[]
        {
           q=> q.questoescorretas == q.quantidadequestoes ? new Achivment
           {
               id='1',
                description = "Acertou todas as perguntas",
                title = "O sabe tudo",
                icon = "https://2.bp.blogspot.com/_U6v9CkCPQxM/TPaZ7RqoI7I/AAAAAAAAARk/7E7lSpkzvIg/s1600/chuck_norris-unisanta.jpg"
           } : null,

           q=> q.questoescorretas == 0? new Achivment
           {
               id='2',
               description = "Errou todas as questões",
               title = "Sabe nada",
               icon = "https://cdn.streamelements.com/uploads/30fcba28-0ef5-4c8b-bf48-3f4a96cd4110.gif"
           } : null,

           q=> q.tempoquiz.TotalSeconds < 60 ? new Achivment
           {
               id='3',
               description="Terminou um quiz em menos de 60s",
               title="Matador de quiz",
               icon =  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Trof%C3%A9u_de_NFA.svg/1200px-Trof%C3%A9u_de_NFA.svg.png"


           } : null,

           q=>q.tempoquiz.TotalSeconds > 60*60 ? new Achivment
           {
               id='4',
              description="Demorou mais de 1 hora para terminar o quiz",
              title="Imagem da conquista",
              icon="https://cdn-icons-png.flaticon.com/512/1576/1576782.png"

           } : null,

           q=> q.quantidadequestoes == q.questoescorretas && q.tempoquiz.TotalSeconds == 60? new Achivment
           {
               id='5',
               description = "Selo dlç",
               title = "Acertou todas as questoes em 60 segundos",
               icon = "https://cdn-icons-png.flaticon.com/512/2972/2972497.png"
           } : null

        };
        #endregion

        public List<Achivment> GetAchviments(Quiz[] quizzes)
        {

            var achivments = new List<Achivment>();

            foreach (var quiz in quizzes)
                achivments.AddRange(this.AchivmentsList.Select(func => func(quiz))
                    .Where(o => o != null));


            return achivments.Distinct().ToList();
        }

    }
}
