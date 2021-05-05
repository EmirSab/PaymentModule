using Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        #region 15.170 Creating a token service -> TokenService
        string CreateToken(AppUser user);
        #endregion
    }
}
