using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CustomerBasketDto
    {
        #region 16.182 Adding validation for basket and creating dto -> BasketItemDto
        [Required]
        public string Id { get; set; }

        public List<BasketItemDto> Items { get; set; }
        #endregion

        #region 21.261.1 Update CustomerBasketDto with new properties -> PaymentsController
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        #endregion

        // 21.264.2 Add shipping price to dto -> basket.service.ts
        public decimal ShippingPrice { get; set; }
    }
}
