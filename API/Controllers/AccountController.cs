using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    #region 15.168 Adding controller for accounts -> UserDto
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService, IMapper mapper) 
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }


        #region 15.174 Adding GetCurrentUser() -> UserManagerExtensions
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            // 15.175.1 Adding new methods -> AddressDto
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };

        }

        //is email adress is already in use
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        //get adress
        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            // 15.175.1 Adding new methods
            var user = await _userManager.FindUserByClaimsPrincipleWithAddressAsync(HttpContext.User);
            //15.176.2 Adding dto to the controller and adding method to update the address
            return _mapper.Map<Address, AddressDto>(user.Address);
            //return user.Address;
        }
        #endregion

        #region 15.176.2 Adding dto to the controller and adding method to update the address
        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult> UpdateUserAddress(AddressDto address)
        {
            //gives us user with the address
            var user = await _userManager.FindUserByClaimsPrincipleWithAddressAsync(HttpContext.User);

            user.Address =  _mapper.Map<AddressDto, Address>(address);

            //update user
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem updating the user");
        }

        #endregion

        #region 15.168 Login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            #region 15.168.3 Add rest of the method -> AccountController
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ApiResponse(401));
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                // 15.172.1 Adding token service -> BuggyController
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
            #endregion
        }
        #endregion

        #region 15.169 Add register method -> RegisterDto.cs
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            #region 15.169.2 Add rest of the logic for register -> ITokenService
            var user = new AppUser
            { 
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                DisplayName = user.DisplayName,
                // 15.172.1
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };

            #endregion
        }
        #endregion
    }
    #endregion
}
