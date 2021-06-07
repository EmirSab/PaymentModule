using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities.OrderAggregate
{
    #region 18.208 Adding order class that will agreate all above classes, adding properties -> OrderConfiguration.cs
    public class Order : BaseEntity
    {
        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, Address shipToAddress, DeliveryMethod deliveryMethod, decimal subtotal)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
            Subtotal = subtotal;

        }
        // it will get list of order through email
        public string BuyerEmail { get; set; }
        // storing the local time
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public Address ShipToAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal GetTotal()
        {
            return Subtotal + DeliveryMethod.Price;
        }
    }

    #endregion
}
