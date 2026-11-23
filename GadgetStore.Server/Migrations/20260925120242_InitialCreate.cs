using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GadgetStore.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Смартфоны", "OLED 120 Гц, 108 МП", "https://via.placeholder.com/300x200?text=Smartphone", "Смартфон Flagship X", 89990m },
                    { 2, "Ноутбуки", "RTX 4070, 32 ГБ ОЗУ, SSD 1 ТБ", "https://via.placeholder.com/300x200?text=Laptop", "Игровой ноутбук Beast", 145000m },
                    { 3, "Аксессуары", "Шумоподавление ANC", "https://via.placeholder.com/300x200?text=Headphones", "Наушники SoundPro", 12990m },
                    { 4, "Аксессуары", "GPS, пульсометр, влагозащита", "https://via.placeholder.com/300x200?text=Smartwatch", "Умные часы FitPulse", 18500m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
