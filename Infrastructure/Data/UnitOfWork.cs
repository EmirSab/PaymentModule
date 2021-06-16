using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    #region 18.217 Implement UnitOfWork -> ApplicationServicesExtensions
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        // for storing repositories
        private Hashtable _repositories;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }
        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            // checking if there is hashtable created (if there is any repositories)
            if (_repositories == null) _repositories = new Hashtable();

            // getting the type of entity
            var type = typeof(TEntity).Name;

            // if the hashtable containes repository with this type
            if (!_repositories.ContainsKey(type))
            {
                // create a type of generic repository
                var repositoryType = typeof(GenericRepository<>);

                //creating an instance of repositroy
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);

                //adding repository to hashtable
                _repositories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>)_repositories[type];
        }
    }
    #endregion
}
