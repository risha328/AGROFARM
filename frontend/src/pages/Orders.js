import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]); // Always starts as empty array ✅

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/user/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders || []); // Always set array ✅
      } catch (error) {
        console.error(error);
        setOrders([]); // On error, keep it safe as array ✅
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>Order #{order._id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrders;


