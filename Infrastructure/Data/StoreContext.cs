using Core.Entities;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure.Data
{
    #region 2.11 Add context and neccessary packages -> appsettings.Developmennt.json
    // dotnet add package Microsoft.EntityFrameworkCore
    // dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
            
        }
        public DbSet<Product> Products {get; set;}
    }
    #endregion
}