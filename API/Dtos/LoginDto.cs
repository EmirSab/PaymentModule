using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    #region 15.168.2 Add logindto -> AccountController
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    #endregion
}
