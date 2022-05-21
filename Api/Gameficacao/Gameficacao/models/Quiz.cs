using System;

namespace RankingApi.Context
{
   public struct Quiz
    {
      
        public int quantidadequestoes { get; set; }
        public int questoescorretas { get; set; }
        public TimeSpan tempoquiz { get; set; }
        public int materiaquiz { get; set; }
        public int idaluno { get; set; }

        public int NotaTotal => quantidadequestoes - questoescorretas;
    }

}