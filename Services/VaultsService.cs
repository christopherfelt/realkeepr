using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;

namespace keepr.Services
{
    public class VaultsService
    {
        private readonly VaultsRepository _repo;

        public VaultsService(VaultsRepository repo)
        {
            _repo = repo;
        }

        internal IEnumerable<Vault> Get(string userId)
        {
            return _repo.Get(userId);
        }

        internal Vault Get(int id)
        {
            Vault exists = _repo.GetById(id);
            if(exists == null)
            {
                throw new Exception("Invalid Vault Id");
            }
            return exists;
        }

        internal Vault Create(Vault newVault)
        {
            return _repo.Create(newVault);
        }

        internal Vault Edit(Vault vaultToUpdate, string userId)
        {
            Vault foundVault = Get(vaultToUpdate.Id);
            if(foundVault.UserId == userId && _repo.Edit(vaultToUpdate, userId))
            {
                return vaultToUpdate;
            }
            throw new Exception("You can edit the given vault");
        }

        internal Vault Delete(int id)
        {
            Vault exists = Get(id);
            _repo.Delete(id);
            return exists;
        }
    }
}