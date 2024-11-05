using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyLopController : ControllerBase
    {
        public readonly IConfiguration _config;


        //private readonly TodoContext _context;

        public MyLopController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        [Route("GetAll")]
        public string GetNS()
        {
            SqlConnection conn = new SqlConnection(_config.GetSection("ConnectionStrings")["xx"].ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM student ORDER BY id DESC", conn);
            DataTable dt = new DataTable();
            da.Fill(dt);

            List<Lop> lopList = new List<Lop>();
            Response response = new Response();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Lop lop = new Lop();
                    lop.id = Convert.ToInt32(dt.Rows[i]["id"]);
                    lop.name = Convert.ToString(dt.Rows[i]["name"]);
                    lop.age = Convert.ToInt32(dt.Rows[i]["age"]);
                    lop.class1 = Convert.ToString(dt.Rows[i]["class"]);
                    lop.phone = Convert.ToString(dt.Rows[i]["phone"]);

                    lopList.Add(lop);
                }
            }

            if (lopList.Count > 0)
            {
                return JsonConvert.SerializeObject(lopList);
            }
            else
            {
                response.StatusCode = 100;
                response.errorMess = "No data found";
                return JsonConvert.SerializeObject(response);
            }
        }

        [HttpPost]
        [Route("AddNewStudent")]
        public int InsertStudent(Lop st)
        {
            SqlConnection conn = new SqlConnection(_config.GetSection("ConnectionStrings")["xx"].ToString());

            conn.Open();
            SqlCommand da = new SqlCommand("INSERT INTO student(name, age, class, phone) VALUES (@name, @age, @class1, @phone)", conn);
            da.Parameters.AddWithValue("@name", st.name);
            da.Parameters.AddWithValue("@age", st.age);
            da.Parameters.AddWithValue("@class1", st.class1);
            da.Parameters.AddWithValue("@phone", st.phone);

            return da.ExecuteNonQuery();
        }

        [HttpPut]
        [Route("UpdateStudent")]
        public int UpdateStudent(Lop st, int id)
        {
            SqlConnection conn = new SqlConnection(_config.GetSection("ConnectionStrings")["xx"].ToString());

            conn.Open();
            SqlCommand da = new SqlCommand("UPDATE student SET name = @name, age = @age, class = @class, phone =@phone WHERE id = @id", conn);
            da.Parameters.AddWithValue("@id", id);
            da.Parameters.AddWithValue("@name", st.name);
            da.Parameters.AddWithValue("@age", st.age);
            da.Parameters.AddWithValue("@class", st.class1);
            da.Parameters.AddWithValue("@phone", st.phone);

            return da.ExecuteNonQuery();
        }


        [HttpDelete]
        [Route("DeleteStudent")]
        public int DeleteStudent(int id)
        {
            SqlConnection conn = new SqlConnection(_config.GetSection("ConnectionStrings")["xx"].ToString());

            conn.Open();
            SqlCommand da = new SqlCommand("DELETE FROM student WHERE id = @id", conn);
            da.Parameters.AddWithValue("@id", id);

            return da.ExecuteNonQuery();
        }
    }
}