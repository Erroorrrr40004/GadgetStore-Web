using Microsoft.AspNetCore.Mvc;
using GadgetStore.Server.Data;
using GadgetStore.Server.Models;

namespace GadgetStore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProducts([FromQuery] string? brand)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(brand))
            {
                query = query.Where(p => p.Brand.ToLower() == brand.ToLower());
            }

            var products = query.ToList();
            var brands = _context.Products.Select(p => p.Brand).Distinct().ToList();

            return Ok(new { brands, products });
        }

        [HttpGet("order/{id}")]
        public IActionResult GetOrderStatus(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            if (order == null) return NotFound(new { message = "Заказ не найден" });

            return Ok(order);
        }

        [HttpPost("review")]
        public IActionResult AddReview([FromBody] ReviewDto dto)
        {
            string userId = "User1";

            bool isDelivered = _context.Orders.Any(o => o.UserId == userId &&
                                                        o.ProductId == dto.ProductId &&
                                                        o.Status == OrderStatus.Delivered);

            if (!isDelivered)
            {
                return BadRequest(new { message = "Оставить отзыв можно только после получения заказа!" });
            }

            var review = new Review
            {
                ProductId = dto.ProductId,
                UserId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment
            };

            _context.Reviews.Add(review);
            _context.SaveChanges();

            return Ok(new { message = "Отзыв успешно добавлен!" });
        }
    }

    public class ReviewDto
    {
        public int ProductId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}