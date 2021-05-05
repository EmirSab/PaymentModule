using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class RegisterDto
    {
        #region 15.169.1 Add properties for dto ->AccountController
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        #endregion
    }
}
