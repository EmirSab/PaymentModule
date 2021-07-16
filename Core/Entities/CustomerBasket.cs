using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class CustomerBasket
    {
        #region 13.136 Add properties for basket -> BasketItem
        // 1.136.2 Add constructor and empty one in order not to crate problems for redis -> IBasketRepository
        public CustomerBasket()
        {

        }
        public CustomerBasket(string id)
        {
            Id = id;
        }
        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        #endregion

        #region 21.260.1 Adding more properties to get delivery method id -> PaymentService.cs
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        #endregion

        #region 21.264.1 Add shipping price -> CustomerBasketDto
        public decimal ShippingPrice { get; set; }
        #endregion
    }
}
