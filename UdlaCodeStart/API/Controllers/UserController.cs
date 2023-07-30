using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebAPI.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UcsContext _context;
        public UserController(UcsContext context)
        {
            _context = context;
        }

        [Route("authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] User user)
        {
            if (user == null) 
                return BadRequest(string.Empty);

            var userExist = await _context.User.FirstOrDefaultAsync(d => d.UserName == user.UserName);

            if (userExist == null)
                return NotFound(new { Mesagge = "Usuario no encontrado"}) ;

            if (String.Equals(user.Password, userExist.Password)) {
                return BadRequest(new { Mesagge = "Usuario o contraseña incorrecto" });
            }

            userExist.Token = CreateJWT(user);
            return Ok( new { 
                Token = userExist.Token
            });
        }

        private string CreateJWT(User user) {
            var jwtToken = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email)
                });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokeDescriptor = new SecurityTokenDescriptor { 
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtToken.CreateToken(tokeDescriptor);

            return jwtToken.WriteToken(token);
        }

    }
}
