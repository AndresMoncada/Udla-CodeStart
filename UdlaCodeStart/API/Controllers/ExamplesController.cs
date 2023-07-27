using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/Example")]
    [ApiController]
    public class ExamplesController : ControllerBase
    {
        private UcsContext _context;
        public ExamplesController(UcsContext context)
        {
            _context = context;
        }

        [Route("getExamples")]
        [HttpGet]
        public async Task<ActionResult<List<Example>>> GetExamples()
        {
            var result = _context.Example.ToList();
            if (result.Count == null)
            {
                return NotFound("Datos no encontrados");
            }
            return result;
        }
    }
}
