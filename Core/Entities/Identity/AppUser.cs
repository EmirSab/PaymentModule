using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        //15.162 Add AppUser class for user properties  -> Address.cs
        public string DisplayName { get; set; }
        public Address Address { get; set; }
    }
}
