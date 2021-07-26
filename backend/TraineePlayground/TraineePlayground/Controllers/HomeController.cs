using Microsoft.AspNetCore.Mvc;

namespace TraineePlayground.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Hello World";
        }
    }
}
