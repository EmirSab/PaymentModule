using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities.OrderAggregate
{
    #region 18.207.4 Add OrderItem.cs and properties (Address entity is a value entity it does not have id) -> Order.cs
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {

        }
        public OrderItem(ProductItemOrdered itemOrdered, decimal price, int quantity)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
        }
        public ProductItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
    #endregion
}
