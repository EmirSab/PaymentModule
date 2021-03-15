using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    public class ProductSpecParams
    {
        #region 6.64 Add params for paggination -> ProductsController
        private const int MaxPageSize = 50;

        //always returns first page
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
        #endregion

        #region 6.66 Add Search params -> ProductsWithTypesAndBrandsSpecification
        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
        #endregion
    }
}
