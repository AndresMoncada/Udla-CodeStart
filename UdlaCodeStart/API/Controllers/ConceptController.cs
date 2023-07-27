using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/Concept")]
    [ApiController]
    public class ConceptController : ControllerBase
    {
        private UcsContext _context;
        public ConceptController(UcsContext context)
        {
            _context = context;
        }

        [Route("getConceptsById")]
        [HttpGet]
        public async Task<ActionResult<List<Concept>>> GetConceptsById()
        {
            var result = _context.Concept.ToList();
            if (result.Count == null)
            {
                return NotFound("Datos no encontrados");
            }
            return result;
        }
    }
}
