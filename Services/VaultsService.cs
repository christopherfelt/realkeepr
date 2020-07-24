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

        internal Vault Get(int id, string userId)
        {
            Vault exists = _repo.GetById(id);
            if(exists == null || exists.UserId != userId)
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
            Vault foundVault = _repo.GetById(vaultToUpdate.Id);
            if(foundVault.UserId == userId && _repo.Edit(vaultToUpdate, userId))
            {
                return vaultToUpdate;
            }
            throw new Exception("You cannot edit the given vault");
        }

        internal Vault Delete(int id, string userId)
        {
            Vault exists = _repo.GetById(id);
            if(exists.UserId == userId){
                _repo.Delete(id);
                return exists;
            }
            throw new Exception("You cannot delete the given vault");

        }
    }
}