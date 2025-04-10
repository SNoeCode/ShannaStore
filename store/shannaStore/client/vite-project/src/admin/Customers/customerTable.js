import { useEffect, useState } from "react";
import axios from "axios";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

 
  useEffect(() => {
    axios.get("http://localhost:3000/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;