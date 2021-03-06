using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    #region 4.36.1 Implementacija interfacea ->SpecificationEvaluator
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        public BaseSpecification(){}
        public Expression<Func<T, bool>> Criteria {get;}

        public List<Expression<Func<T, object>>> Includes {get;} = 
        new List<Expression<Func<T, object>>>();

        // metod za dodavanje includes
        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

    }
    #endregion
}