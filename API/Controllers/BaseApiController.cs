using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // 5.49 Add Base Controller ->BuggyController
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}