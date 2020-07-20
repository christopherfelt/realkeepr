using System;
using System.Collections.Generic;
using System.Security.Claims;
using keepr.Models;
using keepr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VaultKeepsController: ControllerBase
    {
        private readonly VaultKeepsService _vks;

        public VaultKeepsController(VaultKeepsService vks)
        {
            _vks = vks;
        }

        [HttpPost]
        public ActionResult<DTOVaultKeep> Post([FromBody] DTOVaultKeep newVaultKeep)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                newVaultKeep.UserId = userId;
                return Ok(_vks.Create(newVaultKeep));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<DTOVaultKeep> Delete(int id)
        {
            try
            {
                return Ok(_vks.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [HttpDelete("{keepid}/{vaultid}")]
        public ActionResult<DTOVaultKeep> Delete(int keepid, int vaultid)
        {
            try
            {
                return Ok(_vks.Delete(keepid, vaultid));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}