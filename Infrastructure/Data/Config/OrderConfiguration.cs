using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data.Config
{
    #region 18.209 Configuratin properties that order ownes -> OrderItemConfiguration.cs
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
       
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            // address config 
            builder.OwnsOne(o => o.ShipToAddress, a =>
            {
                a.WithOwner();
            });

            //config status and turning it into string
            builder.Property(s => s.Status)
                .HasConversion(
                    o => o.ToString(),
                    o => (OrderStatus) Enum.Parse(typeof(OrderStatus), o)
                );

            // deleting the order would delete related orderitems
            builder.HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }

    #endregion
}
