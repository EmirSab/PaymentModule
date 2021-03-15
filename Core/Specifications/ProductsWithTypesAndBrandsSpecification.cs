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
        // 6.64.2 Add ProductSpecParams and pagging -> Helpers/Pagination
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams) : 
            base(x =>
            #region 6.66.1 check if the string has a value ->ProductWithFiltersForCountSpecification
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search))
            &&
            #endregion
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) && 
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            #region 6.64.2 add paging
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);
            #endregion
            // chacking the value of the sort it will be by name or price
            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
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