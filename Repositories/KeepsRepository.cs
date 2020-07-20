using System;
using System.Collections.Generic;
using System.Data;
using Keepr.Models;
using Dapper;

namespace Keepr.Repositories
{
    public class KeepsRepository
    {
        private readonly IDbConnection _db;

        public KeepsRepository(IDbConnection db)
        {
            _db = db;
        }

        internal IEnumerable<Keep> Get()
        {
            string sql = "SELECT * FROM keeps WHERE isPrivate = 0;";
            return _db.Query<Keep>(sql);
        }

        internal Keep Create(Keep KeepData)
        {
            string sql = @"
            INSERT INTO keeps
            (name, description, userId, img, isPrivate, views, shares, keeps)
            VALUES
            (@Name, @Description, @UserId, @Img, @IsPrivate, @Views, @Shares, @Keeps);
            SELECT LAST_INSERT_ID();
            ";
            KeepData.Id = _db.ExecuteScalar<int>(sql, KeepData);
            return KeepData;
        }


        internal Keep GetById(int id)
        {
            string sql = @"
                SELECT * FROM keeps
                WHERE id = @id";
            return _db.QueryFirstOrDefault<Keep>(sql, new { id });

        }

        internal bool IncreaseKeeps(Keep keepToUpdate)
        {
            string sql = @"
                UPDATE keeps
                SET
                    keeps = @Keeps
                WHERE id = @Id";
            int affectedRows = _db.Execute(sql, keepToUpdate);
            return affectedRows == 1;
        }


        internal bool IncreaseShares(Keep keepToUpdate)
        {
            string sql = @"
                UPDATE keeps
                SET
                    shares = @Shares
                WHERE id = @Id";
            int affectedRows = _db.Execute(sql, keepToUpdate);
            return affectedRows == 1;
        }

        internal bool IncreaseViews(Keep keepToUpdate)
        {
            string sql = @"
                UPDATE keeps
                SET
                    views = @Views
                WHERE id = @Id";
            int affectedRows = _db.Execute(sql, keepToUpdate);
            return affectedRows == 1;
        }

        internal bool Edit(Keep keepToUpdate)
        {
            string sql = @"
                UPDATE keeps
                SET
                    name = @Name,
                    description = @Description,
                    img = @Img,
                    isPrivate = @IsPrivate,
                    views = @Views,
                    shares = @Shares,
                    keeps = @Keeps
                WHERE id = @Id
                AND userId = @UserId";
            int affectedRows = _db.Execute(sql, keepToUpdate);
            return affectedRows == 1;
            // string sql2 = "SELECT * FROM keeps where id = @Id";
            // return _db.QueryFirstOrDefault<Keep>(sql2, keepToUpdate);
        }

        internal void Delete(int id)
        {
            string sql = "DELETE FROM keeps WHERE id = @Id";
            _db.Execute(sql, new { id });
        }
    }
}