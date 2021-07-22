using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    #region 18.212.1 Implementing interface -> ApplicationServiceExtensions.cs
    public class OrderService : IOrderService
    {
        #region 18.213 Implementing order methods in the service -> OrdersController
        /*
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IBasketRepository _basketRepo;
        private readonly IGenericRepository<DeliveryMethod> _dmRepo;
        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<DeliveryMethod> dmRepo,
            IGenericRepository<Product> productRepo, IBasketRepository basketRepo)
        {
            _orderRepo = orderRepo;
            _productRepo = productRepo;
            _dmRepo = dmRepo;
            _basketRepo = basketRepo;
        }*/
        #region 18.219 Adding Unit of work to order service ->
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;

        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork, IPaymentService paymentService)
        {
            _basketRepo = basketRepo;
            _unitOfWork = unitOfWork;
            _paymentService = paymentService;
        }
        #endregion
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            //get basket from repo
            var basket = await _basketRepo.GetBasketAsync(basketId);

            //get items from product repo
            var items = new List<OrderItem>();
            //looping through basket to get the details of items
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrder = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrder, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            //get delivery method from repo
            var devliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            // calculate subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            #region 21.271.3 Checking if there is exist ing order -> PaymentService
            var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            // if payment failed deleting the previous order and creating a new one
            if (existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }
            #endregion

            //create order
            // 21.270.1 Add paymentIntentId ->OrderByPaymentIntentIdWithItemsSpecification
            var order = new Order(items,buyerEmail, shippingAddress, devliveryMethod, subtotal, basket.PaymentIntentId);

            #region 18.219 
            _unitOfWork.Repository<Order>().Add(order);
            //save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            //delete basket
            //await _basketRepo.DeleteBasketAsync(basketId);

            #endregion
            //return the order
            return order;
        }

        #region 18.220.1 Implement the gets methods -> OrderController
        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        #endregion
        #endregion
    }
    #endregion
}
