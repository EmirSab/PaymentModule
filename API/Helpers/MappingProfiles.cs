using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    #region 4.43 Add Mapping profiles -> Startup.cs
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // 4.44 Mapping name to object .ForMember() ->ProductsController
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            //4.45.2 add resolver for picture
            .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());
        }
    }
    #endregion
}