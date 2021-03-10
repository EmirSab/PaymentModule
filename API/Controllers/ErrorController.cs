using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")]
    #region 5.54.1 Add anotation for swagger ->ProductsController
    [ApiExplorerSettings(IgnoreApi = true)]
    #endregion

    public class ErrorController : BaseApiController
    {
        #region 5.51 Adding controller for Errors ->Startup.cs
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
        #endregion
    }
}