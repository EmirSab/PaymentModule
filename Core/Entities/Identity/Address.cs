using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities.Identity
{
    public class Address
    {
        // 15.162.1 Add properties for address ->
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
