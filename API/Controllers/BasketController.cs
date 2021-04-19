using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        #region 13.139 Controller for Baskets ->
        private readonly IBasketRepository _baskerRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _baskerRepository = basketRepository;
        }
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _baskerRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            var updateBasket = await _baskerRepository.UpdateBasketAsync(basket);
            return Ok(basket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _baskerRepository.DeleteBasketAsync(id);
        }
        #endregion
    }
}
