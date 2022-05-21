using Gameficacao.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Gameficacao.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        HttpClient http;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
            http = new HttpClient() { BaseAddress = new Uri(_configuration["Apis:auteticacao"]) };
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(Usuario user)
        {
            var jwtToken = await GenerateJwtToken(user);

            return Ok(new { user = jwtToken.user, jwt = jwtToken.token });
        }

         async Task<(ExtUsuario user ,string token)> GenerateJwtToken(Usuario user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["AppSettings:Secret"]);

            var usuarioCotent = new StringContent(JsonConvert.SerializeObject(user));
            usuarioCotent.Headers.ContentType = new
            MediaTypeHeaderValue("application/json");


            var result = await
           this.http.PostAsync($"Autenticacao/login", usuarioCotent);

            if (result.IsSuccessStatusCode)
            {
                var gettoken = JsonConvert.DeserializeObject<dynamic>(await result.Content.ReadAsStringAsync());

                this.http.DefaultRequestHeaders.Add("Authorization", $"Bearer {gettoken.bearer}");
                var getUserRequest = await this.http.GetAsync($"Usuario/{gettoken.id}");

                if (getUserRequest.IsSuccessStatusCode)
                {
                 
                    var getUser = JsonConvert.DeserializeObject<ExtUsuario>(await getUserRequest.Content.ReadAsStringAsync());

                    if (getUser is  null)
                        return (null,"");

                    var claims = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, getUser.nome),
                        new Claim(ClaimTypes.Email, getUser.email),
                        new Claim(ClaimTypes.Role,  getUser.role),
                        new Claim(ClaimTypes.DateOfBirth, getUser.nascimento.ToString()),
                        new Claim(ClaimTypes.Gender,  getUser.genero),
                        new Claim("LGPD", getUser.lgpd.ToString()),
                        new Claim("AuthenticationApiToken",  $"Bearer {gettoken.bearer}")
                    });

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = claims,
                        Expires = DateTime.UtcNow.AddHours(8),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    
                    return (getUser,tokenHandler.WriteToken(token));
                }
            }

            return (null,"Not Found");
        }




    }
}
