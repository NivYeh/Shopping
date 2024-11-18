// AppController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopWebApplication.Data;
using ShopWebApplication.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/app/AddCustomer
        [HttpPost]
        [Route("AddCustomer")]
        public async Task<IActionResult> AddCustomer([FromBody] Order request)
        {
            // Check if request is null or contains invalid data
            if (request == null)
            {
                return BadRequest("Invalid data.");
            }

            var newOrder = new Order
            {
                FullName = request.FullName,
                Address = request.Address,
                Email = request.Email,
                List = request.List,
            };

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            return Ok("Added Successfully");
        }

        // GET: api/app/GetTable
        [HttpGet]
        [Route("GetTable")]
        public async Task<IActionResult> GetTable()
        {
            var orders = await _context.Orders.ToListAsync();
            return Ok(orders);
        }
    }


}
