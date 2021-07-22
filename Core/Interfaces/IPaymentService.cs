using Core.Entities;
using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    #region 21.259.2 Creating a IPaymentService for payments -> PaymentService
    public interface IPaymentService
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
        #endregion

        #region 21.277 Updating the order with new statu, create a methods to handle events from stripe -> PaymentService
        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
        #endregion
    }

}
