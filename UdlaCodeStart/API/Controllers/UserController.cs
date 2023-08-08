using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using WebAPI.Helper;

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

        public class MarkAsViewRequest
        {
            public string IdTopic { get; set; }
            public int IdUser { get; set; }
        }

        [HttpPost("markAsView")]
        public async Task<bool> MarkAsView([FromBody] MarkAsViewRequest request)
        {
            if (request == null)
            {
                return false;
            }
            int[] idTopicArray = request.IdTopic.Split(',').Select(int.Parse).ToArray();
            foreach (int idTopic in idTopicArray)
            {
                var register = await _context.User_Topic.FirstOrDefaultAsync(d => d.IdUser == request.IdUser && d.IdTopic == idTopic);
                if (register == null)
                {
                    var newRegister = new User_Topic
                    {
                        IdTopic = idTopic,
                        IdUser = request.IdUser
                    };
                    await _context.AddAsync(newRegister);
                    await _context.SaveChangesAsync();
                }
            }

            return true;
        }

        [HttpPost("unmarkAsView")]
        public async Task<bool> UnmarkAsView([FromBody] MarkAsViewRequest request)
        {
            if (request == null)
            {
                return false;
            }
            int[] idTopicArray = request.IdTopic.Split(',').Select(int.Parse).ToArray();
            foreach (int idTopic in idTopicArray)
            {
                var register = await _context.User_Topic.FirstOrDefaultAsync(d => d.IdUser == request.IdUser && d.IdTopic == idTopic);
                if (register != null)
                {
                    _context.Remove(register);
                    await _context.SaveChangesAsync();
                }
            }
            return true;
        }

        [Route("getIdUser/{userName}")]
        [HttpGet]
        public async Task<ActionResult<int>> GetIdUser(string userName)
        {
            var result = await _context.User.FirstOrDefaultAsync(d => d.UserName == userName);
            if (result== null)
            {
                return NotFound("Datos no encontrados");
            }
            return result.IdUser;
        }

        [Route("addUser")]
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            if (user == null)
                return BadRequest();

            if (await CheckEmailExistAsync(user.Email))
                return BadRequest(new { Message = "Este email ya está en uso" });

            if (await CheckUsernameExistAsync(user.UserName))
                return BadRequest(new { Message = "El usuario ya existe" });

            var passMessage = CheckPasswordStrength(user.Password);
            if (!string.IsNullOrEmpty(passMessage))
                return BadRequest(new { Message = passMessage.ToString() });

            user.Password = PasswordHasher.HashPassword(user.Password);
            user.Token = "";
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Status = 200,
                Message = "Registro exitoso"
            });
        }
        private async Task<bool> CheckEmailExistAsync(string? email)
        {
            return await _context.User.AnyAsync(x => x.Email == email);
        }
           

        private async Task<bool> CheckUsernameExistAsync(string? username)
        {
            return await _context.User.AnyAsync(x => x.UserName == username);
        }

        private static string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 9)
                sb.Append("La contraseña debe tener mínimo 8 caracteres" + Environment.NewLine);
            if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
                sb.Append("La contraseña debe ser alfanúmerica" + Environment.NewLine);
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("La contraseña debe contener al menos un caracter especial" + Environment.NewLine);
            return sb.ToString();
        }

        [Route("authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] User user)
        {
            if (user == null) 
                return BadRequest(string.Empty);

            var userExist = await _context.User.FirstOrDefaultAsync(d => d.UserName == user.UserName);

            if (userExist == null)
                return BadRequest(new { Message = "Usuario no encontrado" });

            if (!PasswordHasher.VerifyPassword(userExist.Password, user.Password) || !String.Equals(user.UserName, userExist.UserName)) {
                return BadRequest(new { Message = "Usuario o contraseña incorrecto" });
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
                new Claim(ClaimTypes.Name, user.UserName)
             });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtToken.CreateToken(tokenDescriptor);
            return jwtToken.WriteToken(token);
        }

    }
}
