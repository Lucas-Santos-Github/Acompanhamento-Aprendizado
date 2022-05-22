using Newtonsoft.Json;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;

namespace Gameficacao.models
{
    public class Usuario
    {
        public string email { get; set; }
        public string senha { get; set; }


        public static dynamic GetUserById(int id, ClaimsPrincipal User)
        {
            var http = new HttpClient() { BaseAddress = new System.Uri("http://victorgontijo-001-site1.htempurl.com/api/") };


            http.DefaultRequestHeaders.Add("Authorization", User.Claims.FirstOrDefault(o => o.Type == "AuthenticationApiToken")?.Value);
            var result = http.GetAsync($"Usuario/{id}").Result;

            try
            {
                return JsonConvert.DeserializeObject<ExtUsuario>(result.Content.ReadAsStringAsync().Result);
            }
            catch (System.Exception)
            {

                return null;
            }
        }

    }


   

}
