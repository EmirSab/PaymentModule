using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IResponseCacheService
    {
        #region 22.280 Implementing cache on the backend -> ResponseCacheService
        // caching any responces from db in redis like a page of products in response object
        Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive);

        Task<string> GetCashedResponseAsync(string cacheKey);
        #endregion
    }
}
