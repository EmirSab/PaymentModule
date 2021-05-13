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
    }
}
