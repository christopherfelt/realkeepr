using System;
using System.Collections.Generic;
using System.Security.Claims;
using keepr.Models;
using keepr.Services;
using Keepr.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VaultsController : ControllerBase
    {
        private readonly VaultsService _vs;
        private readonly VaultKeepsService _vks;
        public VaultsController(VaultsService vs, VaultKeepsService vks)
        {
            _vs = vs;
            _vks = vks;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<Vault>> Get()
        {
            try
            {
                string userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return Ok(_vs.Get(userId));
                // return Ok("made it to controller");
            } 
            catch (Exception e)
            {
                return BadRequest(e.Message);
            };
        }

        [HttpPost]
        [Authorize]
        public ActionResult<Vault> Post([FromBody] Vault newVault)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                newVault.UserId = userId;
                return Ok(_vs.Create(newVault));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<Vault> GetById(int id)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return Ok(_vs.Get(id, userId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public ActionResult<Vault> Edit(int id, [FromBody] Vault VaultToUpdate)
        {
            try
            {
                VaultToUpdate.Id = id;
                string userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return Ok(_vs.Edit(VaultToUpdate, userId));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<Vault> Delete(int id)
        {
            try
            {
                string userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return Ok(_vs.Delete(id, userId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}/keeps")]
        [Authorize]
        public ActionResult<VaultKeepViewModel> GetKeepsByVaultId(int id)
        {
            try
            {
                string userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return Ok(_vks.GetKeepsByVaultId(id, userId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}