using System;
using System.Data.SqlClient;
using System.Web;
using System.Web.Mvc;
using 兼职发布系统.Models;
namespace 兼职发布系统.Controllers
{
    public class SharedController : Controller
    {
        //
        // GET: /Shared/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Myinfo()
        {
            return View();
        }
        public ActionResult Weather()
        {
            return View();
        }
        public string AdminUser()
        {
            string sql = "select * from userAdmin where username = '{0}' and password = '{1}'";
            sql = string.Format(sql, Request.Form["us"], Request.Form["pw"]);
            SqlDataReader objReader = SQLHelper.GetReader(sql);
            if (objReader.Read())
            {
                string us = objReader.GetValue(0).ToString();
                string pw = objReader.GetValue(1).ToString();
                HttpCookie cook = new HttpCookie("user", us + " " + pw);
                cook.Expires = DateTime.Now.AddDays(30);
                Session["username"] = objReader.GetValue(0).ToString();
                Session["password"] = objReader.GetValue(1).ToString();
                Response.Cookies.Add(cook);
                objReader.Close();
                return "" + us + "," + pw + "";
            }
            else
            {
                objReader.Close();
                return null;
            }
        }
        //public Array Work_sent() { 
        public int RegUser()
        {
            string us = Request.Form["in_us"].ToString();
            string pw = Request.Form["in_pw"].ToString();
            string tel = Request.Form["tel_reg"].ToString();
            string sql1 = "select username from userAdmin where username = '{0}'";
            sql1 = string.Format(sql1, us);
            SqlDataReader objReader = SQLHelper.GetReader(sql1);
            if (objReader.Read())
            {
                objReader.Close();
                return 0;
            }
            else
            {
                string sql = "insert into userAdmin values('{0}', '{1}', '{2}')";
                sql = string.Format(sql, us, pw, tel);
                int a = SQLHelper.SqlExcu(sql);
                if (a > 0)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
        }
        public int Work_sent()
        {
            string work_uname = Request.Form["work_uname"].ToString();
            string work_title = Request.Form["work_title"].ToString();
            string work_place = Request.Form["work_place"].ToString();
            string work_startTime = Request.Form["work_startTime"].ToString();
            string work_stTime = Request.Form["work_stTime"].ToString();
            string work_edTime = Request.Form["work_edTime"].ToString();
            string work_money = Request.Form["work_money"].ToString();
            string work_peo = Request.Form["work_peo"].ToString();
            string work_peoed = Request.Form["work_peoed"].ToString();
            string work_day = Request.Form["work_day"].ToString();
            string work_ask = Request.Form["work_ask"].ToString();
            string work_tel = Request.Form["work_tel"].ToString();
            string sql = "insert into Mwork values('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}')";
            sql = string.Format(sql, work_uname, work_title, work_place, work_startTime, work_stTime, work_edTime, work_money, work_peo, work_peoed, work_day, work_ask, work_tel);
            int a = SQLHelper.SqlExcu(sql);
            if (a > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        public string Work_all()
        {
            string sql = "select * from Mwork";
            SqlDataReader objReader = SQLHelper.GetReader(sql);
            string str = "[";
            while (objReader.Read())
            {
                int work_id = Convert.ToInt32(objReader.GetValue(0));
                string work_uname = objReader.GetValue(1).ToString();
                string work_title = objReader.GetValue(2).ToString();
                string work_place = objReader.GetValue(3).ToString();
                string work_startTime = objReader.GetValue(4).ToString();
                string work_stTime = objReader.GetValue(5).ToString();
                string work_edTime = objReader.GetValue(6).ToString();
                string time = work_startTime + " " + work_stTime + "-" + work_edTime;
                string work_money = objReader.GetValue(7).ToString();
                string work_peo = objReader.GetValue(8).ToString();
                string work_peoed = objReader.GetValue(9).ToString();
                string work_day = objReader.GetValue(10).ToString();
                string work_ask = objReader.GetValue(11).ToString();
                string work_tel = objReader.GetValue(12).ToString();
                str += "{\"work_id\":\"" + work_id + "\",\"title\":\"" + work_title + "\",\"place\":\"" + work_place + "\",\"work_start\":\"" + time + "\",\"money\":\"" + work_money + "\",\"peo_cou\":\"" + work_peo + "\",\"peoed\":\"" + work_peoed + "\",\"time\":\"" + work_day + "\",\"ask\":\"" + work_ask + "\",\"tel\":\"" + work_tel + "\"},";
            }
            objReader.Close();
            return str + ']';
        }
        public int Apply()
        {
            int work_id = Convert.ToInt32(Request.Form["work_id"]);
            string username = Request.Form["us"];
            string sql = "insert into user_apply values('{0}', '{1}')";
            sql = string.Format(sql, username, work_id);
            int a = SQLHelper.SqlExcu(sql);
            string sql1 = "update Mwork set work_peoed = work_peoed + 1 where work_id = '{0}'";
            sql1 = string.Format(sql1, work_id);
            int b = SQLHelper.SqlExcu(sql1);
            if (a > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        public string Reg_works()
        {
            // string username = Request.Form["work_uname"].ToString();
            string username = Request.Form["work_uname"];
            string sql = "select * from Mwork where work_uname = '{0}'";
            sql = string.Format(sql, username);
            SqlDataReader objReader = SQLHelper.GetReader(sql);
            string str = "[";
            while (objReader.Read())
            {
                int work_id = Convert.ToInt32(objReader.GetValue(0));
                string work_uname = objReader.GetValue(1).ToString();
                string work_title = objReader.GetValue(2).ToString();
                string work_place = objReader.GetValue(3).ToString();
                string work_startTime = objReader.GetValue(4).ToString();
                string work_stTime = objReader.GetValue(5).ToString();
                string work_edTime = objReader.GetValue(6).ToString();
                string time = work_startTime + " " + work_stTime + "-" + work_edTime;
                string work_money = objReader.GetValue(7).ToString();
                int work_peo = Convert.ToInt32(objReader.GetValue(8));
                int work_peoed = Convert.ToInt32(objReader.GetValue(9));
                int work_day = Convert.ToInt32(objReader.GetValue(10));
                string work_ask = objReader.GetValue(11).ToString();
                string work_tel = objReader.GetValue(12).ToString();
                str += "{\"work_id\":\"" + work_id + "\",\"title\":\"" + work_title + "\",\"place\":\"" + work_place + "\",\"work_start\":\"" + time + "\",\"money\":\"" + work_money + "\",\"peo_cou\":\"" + work_peo + "\",\"peoed\":\"" + work_peoed + "\",\"time\":\"" + work_day + "\",\"ask\":\"" + work_ask + "\",\"tel\":\"" + work_tel + "\"},";
            }
            objReader.Close();
            return str + ']';
        }
        public string sent_works()
        {
            string username = Request.Form["work_uname"];
            string sql = "select * from Mwork where work_id in (select work_id from user_apply where username = '{0}')";
            sql = string.Format(sql, username);
            SqlDataReader objReader = SQLHelper.GetReader(sql);
            string str = "[";
            while (objReader.Read())
            {
                int work_id = Convert.ToInt32(objReader.GetValue(0));
                string work_uname = objReader.GetValue(1).ToString();
                string work_title = objReader.GetValue(2).ToString();
                string work_place = objReader.GetValue(3).ToString();
                string work_startTime = objReader.GetValue(4).ToString();
                string work_stTime = objReader.GetValue(5).ToString();
                string work_edTime = objReader.GetValue(6).ToString();
                string time = work_startTime + " " + work_stTime + "-" + work_edTime;
                string work_money = objReader.GetValue(7).ToString();
                int work_peo = Convert.ToInt32(objReader.GetValue(8));
                int work_peoed = Convert.ToInt32(objReader.GetValue(9));
                int work_day = Convert.ToInt32(objReader.GetValue(10));
                string work_ask = objReader.GetValue(11).ToString();
                string work_tel = objReader.GetValue(12).ToString();
                str += "{\"work_id\":\"" + work_id + "\",\"title\":\"" + work_title + "\",\"place\":\"" + work_place + "\",\"work_start\":\"" + time + "\",\"money\":\"" + work_money + "\",\"peo_cou\":\"" + work_peo + "\",\"peoed\":\"" + work_peoed + "\",\"time\":\"" + work_day + "\",\"ask\":\"" + work_ask + "\",\"tel\":\"" + work_tel + "\"},";
            }
            objReader.Close();
            return str + ']';
        }
        public int delete_works()
        {
            int work_id = Convert.ToInt32(Request.Form["work_id"]);
            string sql = "delete from Mwork where work_id = '{0}'";
            sql = string.Format(sql, work_id);
            int a = SQLHelper.SqlExcu(sql);
            if (a > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        public int fanhui_works()
        {
            int work_id = Convert.ToInt32(Request.Form["work_id"]);
            string work_uname = Request.Form["work_uname"];
            string sql = "delete from user_apply where username='{0}' and work_id = '{1}'";
            sql = string.Format(sql, work_uname, work_id);
            string sql1 = "update Mwork set work_peoed = work_peoed - 1 where work_id = '{0}'";
            sql1 = string.Format(sql1, work_id);
            int a = SQLHelper.SqlExcu(sql);
            int b = SQLHelper.SqlExcu(sql1);
            if (a > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        public int updateWork()
        {
            string work_id = Request.Form["work_id"].ToString();
            string work_uname = Request.Form["work_uname"].ToString();
            string work_title = Request.Form["work_title"].ToString();
            string work_place = Request.Form["work_place"].ToString();
            string work_startTime = Request.Form["work_startTime"].ToString();
            string work_stTime = Request.Form["work_stTime"].ToString();
            string work_edTime = Request.Form["work_edTime"].ToString();
            string work_money = Request.Form["work_money"].ToString();
            string work_peo = Request.Form["work_peo"].ToString();
            string work_peoed = Request.Form["work_peoed"].ToString();
            string work_day = Request.Form["work_day"].ToString();
            string work_ask = Request.Form["work_ask"].ToString();
            string work_tel = Request.Form["work_tel"].ToString();
            string sql1 = "delete from Mwork where work_id = {0}";
            sql1 = string.Format(sql1, work_id);
            int b = SQLHelper.SqlExcu(sql1);
            string sql = "insert into Mwork values('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}')";
            sql = string.Format(sql, work_uname, work_title, work_place, work_startTime, work_stTime, work_edTime, work_money, work_peo, work_peoed, work_day, work_ask, work_tel);
            int a = SQLHelper.SqlExcu(sql);
            if (a > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        //}
    }
}
