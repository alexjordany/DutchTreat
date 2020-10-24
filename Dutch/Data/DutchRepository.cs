using DutchTreat.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DutchTreat.Data
{
    public class DutchRepository : IDutchRepository
    {
        private readonly DutchContext _dutchContext;
        private readonly ILogger<DutchRepository> _logger;
        public DutchRepository(DutchContext dutchContext, ILogger<DutchRepository> logger)
        {
            _dutchContext = dutchContext;
            _logger = logger;
        }

        public void AddEntity(object model)
        {
            _dutchContext.Add(model);
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return _dutchContext.Orders
                .Include(o => o.Items)
                .ThenInclude(i=>i.Product)
                .ToList();
        }

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                _logger.LogInformation("GetAllProducts was called");

                return _dutchContext.Products.OrderBy(p => p.Title).ToList();
            }
            catch (Exception ex)
            {

                _logger.LogError($"Failed to get all products: {ex}");
                return null;
            }
            
        }

        public Order GetOrderById(int id)
        {
            return _dutchContext.Orders
                 .Include(o => o.Items)
                 .ThenInclude(i => i.Product)
                 .Where(o => o.Id == id)
                 .FirstOrDefault();
        }

        public IEnumerable<Product> GetProductsByCategory(string category)
        {
            return _dutchContext.Products.Where(p => p.Category == category).ToList();
        }

        public bool SaveAll()
        {
            return _dutchContext.SaveChanges() > 0;
        }
    }
}
