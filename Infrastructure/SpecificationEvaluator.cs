using System.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    // 4.37 This method instead of two include statements in controller ->IGenericInterface
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, 
        ISpecification<TEntity> spec)
        {
            var query = inputQuery;
            if(spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);
            }

            #region 6.59.2 Check if there is orderby ->ProductsController
            if (spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);
            }

            if (spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending);
            }
            #endregion

            #region 6.63.2 Add condition for pagging -> ProductSpecParams
            if (spec.IsPaggingEnabled)
            {
                query = query.Skip(spec.Skip).Take(spec.Take);
            }
            #endregion

            query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

            return query;
        }
    }
}