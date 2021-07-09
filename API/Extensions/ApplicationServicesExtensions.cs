using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        #region 5.56 Add Extensions for repository service ->Staartup.cs
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            #region 15.172 Adding token service -> AccountController
            services.AddScoped<ITokenService, TokenService>();
            #endregion
            #region 18.212.2 Add service to startup -> OrderService
            services.AddScoped<IOrderService, OrderService>();
            #endregion

            #region 21.259.4 Add payment service to startup -> PaymentService.cs
            services.AddScoped<IPaymentService, PaymentService>();
            #endregion

            #region 18.217.2 Adding the unit of work -> IGenericRepository
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            #endregion

            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));

            services.Configure<ApiBehaviorOptions>(options => {
                options.InvalidModelStateResponseFactory = actionContext => {
                    var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors).Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);
                };
            });
            return services;
        }
        #endregion
    }
}
