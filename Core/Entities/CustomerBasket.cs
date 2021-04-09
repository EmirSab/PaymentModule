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
    }
}
