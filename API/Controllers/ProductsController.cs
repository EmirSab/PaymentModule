using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        #region 2.9 Add Controller and two methods -> Entities
        [HttpGet]
        public string GetProducts()
        {
            return "this will be a list of products";
        }

        [HttpGet("{id}")]
        public string GetProduct(int id)
        {
            return "this will be single product";
        }
        #endregion
    }
}