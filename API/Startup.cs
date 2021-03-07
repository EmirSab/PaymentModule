using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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
            services.AddScoped<IProductRepository, ProductRepository>();
            #endregion

            #region 4.33.1 Adding Generic Repo -> GenericRepository
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            #region 4.46.1 Add static files
            app.UseStaticFiles();
            #endregion

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
