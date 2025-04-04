import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  const [data, setData] = useState({ orders: [], payments: [], customers: [], inventory: [] });

  useEffect(() => {
    // Simulating API calls for admin dashboard stats
    Promise.all([
      fetch("/api/orders").then(res => res.json()),
      fetch("/api/payments").then(res => res.json()),
      fetch("/api/customers").then(res => res.json()),
      fetch("/api/inventory").then(res => res.json()),
    ])
    .then(([orders, payments, customers, inventory]) => {
      setData({ orders, payments, customers, inventory });
    })
    .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Orders</h2>
        <ul>
          {data.orders.map(order => (
            <li key={order.id}>{order.customerName} - {order.status}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Payments</h2>
        <ul>
          {data.payments.map(payment => (
            <li key={payment.id}>{payment.amount} - {payment.status}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Customers</h2>
        <ul>
          {data.customers.map(customer => (
            <li key={customer.id}>{customer.name} - {customer.email}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Inventory</h2>
        <ul>
          {data.inventory.map(item => (
            <li key={item.id}>{item.productName} - Stock: {item.stock}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;