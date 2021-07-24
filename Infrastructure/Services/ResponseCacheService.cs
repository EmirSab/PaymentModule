using Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        #region 22.280.1 Implementing methods -> ApplicationServiceExtensions

        private readonly IDatabase _database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        // getting the data into redis
        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if (response == null)
            {
                return;
            }

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serializeResponse = JsonSerializer.Serialize(response, options);

            await _database.StringSetAsync(cacheKey, serializeResponse, timeToLive);
        }

        //getting the data out of redis 

        public async Task<string> GetCashedResponseAsync(string cacheKey)
        {
            var cachedResponse = await _database.StringGetAsync(cacheKey);

            if (cachedResponse.IsNullOrEmpty)
            {
                return null;
            }
            return cachedResponse;
        }
        #endregion
    }
}
