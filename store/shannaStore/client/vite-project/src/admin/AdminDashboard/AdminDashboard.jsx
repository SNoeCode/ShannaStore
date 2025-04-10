import React, { useState, useEffect, useContext } from "react";
import "./AdminDashboard.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


const AdminDashboard = () => {
  const [data, setData] = useState({ orders: [], payments: [], customers: [], inventory: [] });
  const navigate = useNavigate()
  const apiUrl = "http://localhost:/3004";
  const { setAuthedUser, authedUser } = useContext(UserContext);
  const userId = localStorage.getItem('userId')
  const token = authedUser?.token || localStorage.getItem("token");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authedUser"));
    if (storedUser) {
      setAuthedUser(storedUser);
    }
  }, []);
  useEffect(() => {
    const fetchOrders = async (userId) => {
      try {
        const response = await fetch(`${apiUrl}/api/orders/${userId}`);
        const orders = await response.json();
        console.log("Orders:", orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Promise.all([
    //   fetch(`${apiUrl}/api/orders/${userId}`).then(res => res.json()),
    //   fetch(`${apiUrl}/api/payments/${userId}`).then(res => res.json()),
    //   fetch(`${apiUrl}/api/customers/${userId}`).then(res => res.json()),
    //   fetch(`${apiUrl}/api/inventory/${userId}`).then(res => res.json()),
    // ])

    //     .then(([orders, payments, customers, inventory]) => {
    //       setData({ orders, payments, customers, inventory });
    //     })
    //     .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>


      </div>

      <section>
        <button className="admin-dashboard-buttons" onClick={() => fetchOrders(userId)}>
          {/* <Link to={'/admin/customer/orders'}> */}
          Get Orders
          {/* </Link> */}
        </button>
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
        {/* navigate("/admin/customer"); */}
        <h2>Customers</h2>
        <button className="admin-dashboard-buttons">
          <Link to={'/admin/customer'}>
            Get Customers
          </Link>
        </button>
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