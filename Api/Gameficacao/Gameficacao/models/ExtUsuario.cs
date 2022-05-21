using System;

namespace Gameficacao.models
{
    public class ExtUsuario
    {

            public string nome { get; set; }
            public string email { get; set; }
            public string genero { get; set; }
            public string role { get; set; }
            public bool lgpd { get; set; }
            public DateTime nascimento { get; set; }

    }
}
