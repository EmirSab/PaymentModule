using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        #region 3.22 Adding methods ->ProductRepository
        // GetProductsAsync is a list that only can be read
        Task<Product> GetProductByIdAsync(int id);

        Task<IReadOnlyList<Product>> GetProductsAsync();
        #endregion
    }
}