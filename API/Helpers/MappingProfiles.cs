using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

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

            #region 15.176.1 Map AddressDto to Address -> AccountController
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            #endregion

            #region 16.168.2 Mapping classes to the dto -> BasketController
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            #endregion

            #region 18.214.2 Map the new Dto -> ClaimsPrincipleExtensions
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            #endregion

            #region 18.224.2 Mapping the new dto's -> OrdersController
            // 18.225 Adding configuration for deliveryMethod, shipping price, productid, name, pictureUrl -> OrderItemUrlResolver
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                // 18.225
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                //18.226.1 Adding resolver to mapper ->
                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());

            #endregion
        }
    }
    #endregion
}