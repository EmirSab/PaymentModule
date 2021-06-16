using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        #region 18.214.3 Add method for getting the email -> OrderController
        public static string RetrieveEmailFromPrincipal(this ClaimsPrincipal user)
        { 
            return user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        }
        #endregion
    }
}
