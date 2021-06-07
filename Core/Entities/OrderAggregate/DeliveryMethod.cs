using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities.OrderAggregate
{
    public class DeliveryMethod : BaseEntity
    {
        #region 18.207.1 Add deliverymethod class -> ProductItemOrdered
        public string ShortName { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        #endregion
    }
}
