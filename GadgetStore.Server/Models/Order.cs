namespace GadgetStore.Server.Models
{
    public enum OrderStatus
    {
        Created = 1,
        Assembly = 2,
        Shipped = 3,
        Delivered = 4
    }

    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public OrderStatus Status { get; set; }
    }
}