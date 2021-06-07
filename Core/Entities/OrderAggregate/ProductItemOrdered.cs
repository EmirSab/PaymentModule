using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        #region 18.207.2 Add ProductItemOrdered for storing values when they were ordered in case of name change -> OrderStatus.cs
        public ProductItemOrdered(int productItemId, string productName, string pictureUrl)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }
        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
        #endregion
    }
}
