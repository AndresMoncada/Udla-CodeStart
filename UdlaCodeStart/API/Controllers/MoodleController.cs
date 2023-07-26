using Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/Moddle")]
    [ApiController]
    public class MoodleController : ControllerBase
    {
        private UcsContext _context;
        public MoodleController(UcsContext context) {
            _context = context;
        }

        [Route("getAllModules")]
        [HttpGet]
        public IEnumerable<Moodle> Get() {
            return _context.Moodle.ToList();
        }
    }
}
