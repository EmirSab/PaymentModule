using Core.Entities;

namespace Core.Specifications
{
    #region 4.39 Add the properties to take -> ProductsController
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        #region 4.40 Adding new constructor for criteria ->ProductsController
        public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
        #endregion
        public ProductsWithTypesAndBrandsSpecification()
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }

    #endregion
}