using System;

namespace Gamificacao.models
{
    public record Achivment
    {
        public string title { get; set; }
        public int exp { get; set; }
        public int id { get; set; }
        public string icon { get; set; }
        public string description { get; set; }
    }

}
