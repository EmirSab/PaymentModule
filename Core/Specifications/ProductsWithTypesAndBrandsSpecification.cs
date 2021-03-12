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

        #region 6.60 Add parametar for sort in the constructor ->ProductsController
        // 6.62.1 Add part with base() i dodati brandid and typeid ->ISpecification
        public ProductsWithTypesAndBrandsSpecification(string sort, int? brandId, int? typeId) : 
            base(x => 
            (!brandId.HasValue || x.ProductBrandId == brandId) && 
            (!typeId.HasValue || x.ProductTypeId == typeId)
            )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            // chacking the value of the sort it will be by name or price
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
                
            }
        }
        #endregion
    }

    #endregion
}