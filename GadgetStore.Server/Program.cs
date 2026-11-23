using GadgetStore.Server.Data;
using GadgetStore.Server.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// РАЗРЕШАЕМ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=gadgetstore.db"));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Products.Any())
    {
        db.Products.AddRange(
            new Product { Name = "Logitech G Pro X Superlight", Brand = "Logitech", Price = 45000, Category = "Mouse", Description = "Топовая игровая мышь", ImageUrl = "https://placehold.co/300x200?text=Logitech+G+Pro" },
            new Product { Name = "Razer Viper V3 Pro", Brand = "Razer", Price = 52000, Category = "Mouse", Description = "Легкая киберспортивная мышь", ImageUrl = "https://placehold.co/300x200?text=Razer+Viper" },
            new Product { Name = "SteelSeries Apex Pro", Brand = "SteelSeries", Price = 67000, Category = "Keyboard", Description = "Механическая клавиатура с регулировкой", ImageUrl = "https://placehold.co/300x200?text=SteelSeries+Apex" },
            new Product { Name = "HyperX Alloy Origins", Brand = "HyperX", Price = 38000, Category = "Keyboard", Description = "Надежная игровая клавиатура", ImageUrl = "https://placehold.co/300x200?text=HyperX+Origins" }
        );

        db.Orders.Add(
            new Order { Id = 101, ProductId = 1, UserId = "User1", Status = OrderStatus.Delivered }
        );

        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ВКЛЮЧАЕМ CORS ПЕРЕД MAPCONTROLLERS
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.Run();