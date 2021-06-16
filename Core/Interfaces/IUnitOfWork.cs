using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    #region 18.217 Adding Unit of Work pattern -> UnitOfWork.cs
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        // it will return number of changes to the db
        Task<int> Complete();
    }
    #endregion
}
