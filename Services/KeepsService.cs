using System;
using System.Collections.Generic;
using System.Data;
using Keepr.Models;
using Keepr.Repositories;

namespace Keepr.Services
{
    public class KeepsService
    {
        private readonly KeepsRepository _repo;
        public KeepsService(KeepsRepository repo)
        { 
            _repo = repo;
        }
        public IEnumerable<Keep> Get()
        {
            return _repo.Get();
        }

        internal Keep Get(int id)
        {
            Keep exists = _repo.GetById(id);
            if(exists == null){
                throw new Exception("Invalid Keep Id");
            }
            return exists;
        }

        public Keep Create(Keep newKeep)
        {
            return _repo.Create(newKeep);
        }

        internal Keep Delete(int id)
        {
            Keep exists = Get(id);
            _repo.Delete(id);
            return exists;
        }

        internal Keep Edit(Keep keepToUpdate, string userId)
        {
            Keep foundKeep = Get(keepToUpdate.Id);
            if (foundKeep.UserId != userId && foundKeep.Keeps < keepToUpdate.Keeps)
            {
                if(_repo.IncreaseKeeps(keepToUpdate))
                {
                    foundKeep.Keeps = keepToUpdate.Keeps;
                    return foundKeep;
                }
                throw new Exception("Could not increase keeps for given keep");
            }

            if(foundKeep.UserId != userId && foundKeep.Shares < keepToUpdate.Shares)
            {
                if(_repo.IncreaseShares(keepToUpdate))
                {
                    foundKeep.Shares = keepToUpdate.Shares;
                    return foundKeep;
                }
                throw new Exception("Could not increase shares for given keep");
            }

            if(foundKeep.UserId != userId && foundKeep.Views < keepToUpdate.Views)
            {
                if(_repo.IncreaseViews(keepToUpdate))
                {
                    foundKeep.Views = keepToUpdate.Views;
                    return foundKeep;
                }
                throw new Exception("Could not increase views for given keep");
            }

            if(foundKeep.UserId == userId && _repo.Edit(keepToUpdate, userId))
            {
                return keepToUpdate;
            }
            throw new Exception("You can not edit the given keep");

        }
    }
}

