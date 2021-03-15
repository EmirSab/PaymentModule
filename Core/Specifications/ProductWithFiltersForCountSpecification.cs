using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        #region 6.65.3 Counting items ->ProductsController
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams) :
            base(x =>
            // 6.66.2 Copy the search code ->sTARTUP.CS
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search))
            &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {

        }
        #endregion
    }
}
