using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Keepr.Models;

namespace keepr.Services
{
    public class VaultKeepsService
    {
        private readonly VaultKeepsRepository _repo;
        private readonly VaultsService _vs;

        public VaultKeepsService(VaultKeepsRepository repo, VaultsService vs)
        {
            _repo = repo;
            _vs = vs;
        }

        private DTOVaultKeep Get(int id)
        {
            DTOVaultKeep exists = _repo.GetById(id);
            if(exists == null)
            {
                throw new Exception("Invalid Vault Id");
            }
            return exists;
        }

        internal DTOVaultKeep Create(DTOVaultKeep newVault)
        {
            return _repo.Create(newVault);
        }

        internal DTOVaultKeep Delete(int id)
        {
            DTOVaultKeep exists = Get(id);
            _repo.Delete(id);
            return exists;
        }

        internal  IEnumerable<VaultKeepViewModel> GetKeepsByVaultId(int vaultId, string userId)
        {
            // TODO might need to put a user check access check on this hence the vault 
            return _repo.GetKeepsByVaultId(vaultId, userId);
        }

        internal DTOVaultKeep Delete(int keepid, int vaultid)
        {
            DTOVaultKeep exists = Get(keepid, vaultid);
            _repo.Delete(exists.Id);
            return exists;
        }

        private DTOVaultKeep Get(int keepid, int vaultid)
        {
            DTOVaultKeep exists = _repo.GetById(keepid, vaultid);
            if(exists == null)
            {
                throw new Exception("Invalid Vault Id");
            }
            return exists;
        }
    }
}