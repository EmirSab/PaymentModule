using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.Helpers;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        #region 2.9 Add Controller and two methods -> Entities
        #region 2.15 Adding logic for getting the data, change the two methods ->IProductRepository
        // Add Postman variables
        // Add new projects
        // 3.23.1 Repository implementation ->BaseEntity

        //4.34.1 Adding IGenericRepository
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepo, IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo, IMapper mapper)
        {
            _mapper = mapper;
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
            _productRepo = productRepo;
        }

        // 4.39.1 Modifying methods ->ProductsWithTypesAndBrandSpecification
        // 4.42.1 Modify GetProduct and GetProducts to add dto ->MappingProfiles
        // 6.59.3 Add string sort in the GetProducts() for sorting the products -> ProductsWithTypesAndBrandsSpecification
        // 6.62 Add parametar for search int bradnid, typeid ->ProductsWithTypesAndBrandsSpecification
        // 6.64.1 Change vars in method for ProductSpecParams ->ProductsWithTypesAndBrandsSpecification
        // 6.65.4 Adding pagination ->ProductSpecParams
        // 21.282 Add cahed attribute to products controller -> shop.service.ts
        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            // 6.65.4 counting spec var
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _productRepo.CountAsync(countSpec);
            //end

            var products = await _productRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            #region 4.44.1 Modify the method to use Mapper -> appsettings.Development.json
            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
            #endregion
            /*return products.Select(product => new ProductToReturnDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                PictureUrl = product.PictureUrl,
                Price = product.Price,
                ProductBrand = product.ProductBrand.Name,
                ProductType = product.ProductType.Name
            }).ToList();*/
        }

        [Cached(600)]
        // 4.40.1 Modify method ->
        [HttpGet("{id}")]
        //5.55 Two errrors that return ->Extensions/ApplicationServicesExtensions
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSpec(spec);

            #region 5.55 Add condition where id does not exist
            if (product == null) return NotFound(new ApiResponse(404)); 
            #endregion

            // 4.43.2 Add Automapper ->
            return _mapper.Map<Product, ProductToReturnDto>(product);
            /*return new ProductToReturnDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                PictureUrl = product.PictureUrl,
                Price = product.Price,
                ProductBrand = product.ProductBrand.Name,
                ProductType = product.ProductType.Name
            };*/
        }
        #endregion
        #endregion

        [Cached(600)]
        #region 3.29.2 Adding methods in controller -> ProductRepository
        // 4.34.1 Prepraviti metode za generic repo ->ISpecification
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepo.ListAllAsync());
        }
        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }
        #endregion
    }
}