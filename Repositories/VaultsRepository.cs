using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using keepr.Models;

namespace keepr.Repositories
{
    public class VaultsRepository
    {
        private readonly IDbConnection _db;

        public VaultsRepository(IDbConnection db)
        {
            _db = db;
        }

        internal IEnumerable<Vault> Get(string userId)
        {
            string sql = "SELECT * FROM vaults where userId = @UserId";
            return _db.Query<Vault>(sql, new { userId });
        }

        internal Vault GetById(int id)
        {
            string sql = @"
                SELECT * FROM vaults
                WHERE id = @Id";
            return _db.QueryFirstOrDefault<Vault>(sql, new { id });
        }

        internal Vault Create(Vault newVault)
        {
            string sql = @"
            INSERT INTO vaults
            (name, description, userId)
            VALUES
            (@Name, @Description, @UserId);
            SELECT LAST_INSERT_ID();";
            newVault.Id = _db.ExecuteScalar<int>(sql, newVault);
            return newVault;
        }

        internal bool Edit(Vault vaultToUpdate, string userId)
        {
            string sql = @"
                UPDATE vaults
                SET
                    name = @Name,
                    description = @Description
                WHERE id = @Id
                AND userId = @UserId";
            int affectedRows = _db.Execute(sql, vaultToUpdate);
            return affectedRows == 1;

        }

        internal void Delete(int id)
        {
            string sql = "DELETE FROM vaults WHERE id = @Id";
            _db.Execute(sql, new { id });
        }
    }
}