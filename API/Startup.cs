using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region 3.22.2 Adding repository ->ProductRepository
            //services.AddScoped<IProductRepository, ProductRepository>();
            #endregion

            #region 13.137.2 Add new repository to startup.cs -> BasketRepository
            services.AddScoped<IBasketRepository, BasketRepository>();
            #endregion

            #region 4.33.1 Adding Generic Repo -> GenericRepository
            //services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            #endregion

            #region 4.43.1 Add Automapper as a service ->ProductController
            services.AddAutoMapper(typeof(MappingProfiles));
            #endregion

            services.AddControllers();
            
            #region 2.12.1 Dodati Context -> ProductsController
            // Add migration after and update database and db update
            // Add PAckage Microsoft.EntityFrameworkCore.Design
            services.AddDbContext<StoreContext>(x => x.UseSqlServer(_config.GetConnectionString("DefaultConnection")));
            #endregion

            #region 15.163.1 Add context as a service -> appSettings.development.json
            services.AddDbContext<AppIdentityDbContext>(x => x.UseSqlServer(_config.GetConnectionString("IdentityConnection")));
            #endregion

            #region 13.135.1 Add Redis as singleton -> appsettings.development.json
            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configuration = ConfigurationOptions.Parse(_config
                    .GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });
            #endregion

            #region 5.53.1 Overriding ApiControlle tag ->
            /*services.Configure<ApiBehaviorOptions>(options =>{
                options.InvalidModelStateResponseFactory = actionContext => {
                    var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors).Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);
                };
            });*/
            #endregion

            #region 5.56.1 Add services -> SwaggerServiceExtensions
            services.AddApplicationServices();
            #endregion

            #region 15.166.1 Add identity extension to startup.cs -> Program.cs
            // 15.171.1 Add config to startup -> appsettings.development.json
            services.AddIdentityServices(_config);
            #endregion

            #region 5.54 Add Swagger config -> ErrorController
            /*services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "SkiNet API", Version="v1" });
            });*/
            #endregion

            // 5.56.3 Include swagger
            services.AddSwaggerDocumentation();

            #region 6.67 Enable CORS -> app.component.html
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            #region 5.52.2 Change generic exception with custom -> Errors/ApiValidationErrorResponse
            /*if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }*/
            app.UseMiddleware<ExceptionMiddleware>();
            #endregion

            #region 5.51.1 Add part for exeptions ->ApiExeption
            app.UseStatusCodePagesWithReExecute("/errors/{0}");
            #endregion

            app.UseHttpsRedirection();

            app.UseRouting();

            #region 4.46.1 Add static files
            app.UseStaticFiles();
            #endregion

            #region 6.67
            app.UseCors("CorsPolicy");
            #endregion
            // 15.171.3 Add authentication to app -> AplicationServiceExtensions
            app.UseAuthentication();

            app.UseAuthorization();

            #region 5.54 Add Swagger config
            /*app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkiNet API v1");
            });*/
            #endregion
            // 5.56.3 Include swagger ->ISpecification
            app.UseSwaggerDocumentation();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
