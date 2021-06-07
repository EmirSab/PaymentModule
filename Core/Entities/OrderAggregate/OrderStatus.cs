using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Core.Entities.OrderAggregate
{
    #region 18.207.3 Adding OrderStatus enum and properties -> OrderItem.cs
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Received")]
        PaymentRecevied,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed
    }
    #endregion
}
