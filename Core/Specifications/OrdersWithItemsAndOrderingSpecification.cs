using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    #region 18.220 Getting the order and the list of orders ->  OrderService
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        // list of orders
        public OrdersWithItemsAndOrderingSpecification(string email): base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        // get individual order
        public OrdersWithItemsAndOrderingSpecification(int id, string email) : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
    #endregion
}
