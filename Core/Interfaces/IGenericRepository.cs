using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    #region 4.33 Add Generic repository and methods ->GenericRepository
    public interface IGenericRepository<T> where T : BaseEntity
    {
         Task<T> GetByIdAsync(int id);
         Task<IReadOnlyList<T>> ListAllAsync();

         #region 4.37.1 Add two methods that take specification as parametar ->GenericRepository
          Task<T> GetEntityWithSpec(ISpecification<T> spec);
          Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
         #endregion
    }

    #endregion
}