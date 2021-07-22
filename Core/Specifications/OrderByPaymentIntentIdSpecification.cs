using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    #region 21.270.2 Getting the order that matches paymentIntentId -> OrderService
    public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId) : base(o => o.PaymentIntentId == paymentIntentId) 
        {

        }
    }
    #endregion
}
