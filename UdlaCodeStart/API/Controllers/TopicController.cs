using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/Topic")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private UcsContext _context;
        public TopicController(UcsContext context)
        {
            _context = context;
        }

        [Route("getTopicsById/{idMoodle}")]
        [HttpGet]
        public async Task<ActionResult<List<Topic>>> GetTopicsById(int idMoodle)
        {
            var result = _context.Topic.Where(d => d.IdMoodle == idMoodle).ToList();
            if (result.Count == null) {
                return NotFound("Datos no encontrados");
            }
            return result;
        }
    }
}
