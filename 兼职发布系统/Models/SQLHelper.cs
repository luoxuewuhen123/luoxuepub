using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
namespace 兼职发布系统.Models
{
    public class SQLHelper
    {
        private static string connString = ConfigurationManager.ConnectionStrings["connString"].ToString();
        public static SqlDataReader GetReader(string sql)
        {
            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = new SqlCommand(sql, conn);
            try
            {
                conn.Open();
                return cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }
#pragma warning disable CS0168 // 声明了变量“ex”，但从未使用过
            catch (Exception ex)
            {
#pragma warning restore CS0168 // 声明了变量“ex”，但从未使用过
                throw;
            }
        }
        public static int SqlExcu(string sql)
        {
            SqlConnection conn = new SqlConnection(connString);
            SqlCommand cmd = new SqlCommand(sql, conn);
            try
            {
                conn.Open();
                int row = cmd.ExecuteNonQuery();
                conn.Close();
                return row;
            }
#pragma warning disable CS0168 // 声明了变量“ex”，但从未使用过
            catch (Exception ex)
            {
#pragma warning restore CS0168 // 声明了变量“ex”，但从未使用过
                conn.Close();
                throw;
            }
        }
    }
}