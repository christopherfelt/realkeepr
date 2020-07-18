using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using keepr.Models;
using Keepr.Models;

namespace keepr.Repositories
{
    public class VaultKeepsRepository
    {
        private readonly IDbConnection _db;

        public VaultKeepsRepository(IDbConnection db)
        {
            _db = db;
        }

        internal DTOVaultKeep Create(DTOVaultKeep newVaultKeep)
        {
            string sql = @"
            INSERT INTO vaultkeeps
            (vaultId, keepId, userId)
            VALUES
            (@VaultId, @KeepId, @UserId);
            SELECT LAST_INSERT_ID();";
            newVaultKeep.Id = _db.ExecuteScalar<int>(sql, newVaultKeep);
            return newVaultKeep;
        }

        internal DTOVaultKeep GetById(int id)
        {
            string sql = "SELECT * FROM vaultkeeps WHERE id = @Id";
            return _db.QueryFirstOrDefault<DTOVaultKeep>(sql, new { id });
        }

        internal void Delete(int id)
        {
            string sql = "DELETE FROM vaultkeeps WHERE id = @Id";
            _db.Execute(sql, new { id });

        }

        internal IEnumerable<VaultKeepViewModel> GetKeepsByVaultId(int vaultId, string userId)
        {
            string sql = @"
            SELECT
            k.*,
            vk.id as vaultKeepId
            FROM vaultkeeps vk
            INNER JOIN keeps k ON k.id = vk.keepId 
            WHERE (vaultId = @vaultId AND vk.userId = @userId)";
            return _db.Query<VaultKeepViewModel>(sql, new { vaultId, userId });
        }
    }
}