
import { useEffect, useState } from "react";

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
      fetch("http://localhost:3000/api/customers")
        .then((response) => response.json())
        .then((data) => setCustomers(data));
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

    )
}
export default Customers