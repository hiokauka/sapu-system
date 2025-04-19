import React, { useState } from "react";
import "../style/Userpage.css";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("addOrder");
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [orders, setOrders] = useState([
    { id: 1, status: "pending", driverArrived: false },
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission for new order
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrders([
      ...orders,
      { id: orders.length + 1, status: "pending", driverArrived: false },
    ]);
    setOrderDetails({ name: "", address: "", description: "" });
  };

  return (
    <div className="user-page">
      <div className="tabs">
        <button
          className={activeTab === "addOrder" ? "active" : ""}
          onClick={() => setActiveTab("addOrder")}
        >
          Add Order
        </button>
        <button
          className={activeTab === "seeOrder" ? "active" : ""}
          onClick={() => setActiveTab("seeOrder")}
        >
          See Order
        </button>
      </div>

      {/* Add Order Tab */}
      {activeTab === "addOrder" && (
        <div className="add-order">
          <h2>Add Order</h2>
          <form onSubmit={handleOrderSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={orderDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={orderDetails.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={orderDetails.description}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Submit Order</button>
          </form>
        </div>
      )}

      {/* See Order Tab */}
      {activeTab === "seeOrder" && (
        <div className="see-order">
          <h2>Your Orders</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <div>
                  <strong>Order #{order.id}</strong>
                  <p>Status: {order.status}</p>
                  <p>Driver Arrived: {order.driverArrived ? "Yes" : "No"}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserPage;
