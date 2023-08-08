using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace WebAPI.Controllers
{
    [Route("api/Exam")]
    [ApiController]
    public class ExamenController : ControllerBase
    {
        private UcsContext _context;
        public ExamenController(UcsContext context)
        {
            _context = context;
        }

        [Route("getQuestionById/{idMoodle}")]
        [HttpGet]
        public async Task<ActionResult<List<Question>>> GetQuestionById(int idMoodle)
        {
            var result = _context.Question.Where(d => d.IdEvaluation == idMoodle)
                                              .OrderBy(x => Guid.NewGuid()) // Orden al azar
                                              .Take(5) // Obtener solo 5 preguntas
                                              .ToList();
            if (result.Count == null)
            {
                return NotFound("Datos no encontrados");
            }
            return result;
        }

        [Route("getAnswers")]
        [HttpGet]
        public async Task<ActionResult<List<Answer>>> GetAnswers()
        {
            var result = _context.Answer.ToList();
            if (result.Count == null)
            {
                return NotFound("Datos no encontrados");
            }
            return result;
        }

        [Route("getCheckTopic/{idTopic}/{idUser}")]
        [HttpGet]
        public async Task<ActionResult<bool>> GetCheckTopic(int idTopic, int idUser)
        {
            var result = await _context.User_Topic.AnyAsync(d => d.IdTopic == idTopic && d.IdUser == idUser);
            return !result;
        }

        [Route("getCountTopic/{idTopic}/{idUser}")]
        [HttpGet]
        public async Task<ActionResult<int>> GetCountTopic(string idTopic, int idUser)
        {
            int[] idTopicArray = idTopic.Split(',').Select(int.Parse).ToArray();

            var result = _context.User_Topic
                         .Where(d => d.IdUser == idUser && idTopicArray.Contains(d.IdTopic))
                         .ToList();

            return result.Count;
        }


    }
}
