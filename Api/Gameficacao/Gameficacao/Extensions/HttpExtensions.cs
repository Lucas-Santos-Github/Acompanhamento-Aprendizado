using System.Linq;
using System.Net.Http;
using System.Security.Claims;

namespace Gameficacao.Extensions
{
    public static class HttpExtensions
    {
        public static void SetExternalUserAuthenticationToken(this HttpClient http, ClaimsPrincipal User)
        {
            var token = User.Claims.FirstOrDefault(o => o.Type == "AuthenticationApiToken")?.Value;
            http.DefaultRequestHeaders.Add("Authorization", token);
        }
    }
}
