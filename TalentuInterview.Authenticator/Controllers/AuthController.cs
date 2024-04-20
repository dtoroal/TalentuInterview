﻿using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TalentuInterview.Authenticator.Models;
using TalentuInterview.Authenticator.Services;

namespace TalentuInterview.Authenticator.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : Controller
{
    private readonly IAuthService _authenticationService;

    public AuthController(IAuthService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost]
    [Route("signup")]
    public IActionResult SignUp([FromBody] LoginRequest loginRequest)
    {
        User? newUser = _authenticationService.RegisterUser(loginRequest.Email, loginRequest.Password).Result;

        if (newUser != null)
        {
            string token = _authenticationService.SetJWTToken(newUser.Email);
            return Ok(token);
        }
        else
        {
            return BadRequest("Could not create user");
        }
    }


    [HttpPost]
    [Route("login")]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        User? user = _authenticationService.AuthenticateUser(loginRequest.Email, loginRequest.Password).Result;

        if (user != null)
        {
            string token = _authenticationService.SetJWTToken(user.Email);
            return Ok(token);
        } else
        {
            return BadRequest("Wrong credetials");
        }
    }

}