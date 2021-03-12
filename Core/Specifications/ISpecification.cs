using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    #region 4.36 Add Specification interface -> BaseSpecification.cs
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }

        #region 6.59 Add Expression for orderingby ->BaseSpecification
        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDescending { get; }
        #endregion

        #region 6.63 Add properties for paggination -> BaseSpecification
        int Take { get; }
        int Skip { get; }
        bool IspaggingEnabled { get; }
        #endregion
    }
    #endregion
}