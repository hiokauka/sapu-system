import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialOrders = [
  {
    from: "Kuala Lumpur",
    to: "Penang",
    price: "100",
    passanger: "2",
    driverInfo: null,
  },
  {
    from: "Johor Bahru",
    to: "Melaka",
    passanger: "2",
    price: "80",
    driverInfo: null,
  },
];

const Driver = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [selectedETA, setSelectedETA] = useState(5);
  const navigate = useNavigate();

  const handleConfirmETA = () => {
    const index = selectedOrderIndex;
    const acceptedOrder = {
      ...orders[index],
      driverInfo: {
        eta: selectedETA,
        status: "Accepted",
      },
    };

    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    setSelectedOrderIndex(null);

    navigate("/driver-order", { state: { order: acceptedOrder } });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Available Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#272635",
              cursor: "pointer",
            }}
            onClick={() => setSelectedOrderIndex(index)}
          >
            <div style={{ textAlign: "left", marginLeft: "2rem" }}>
              <p><strong>From:</strong> {order.from}</p>
              <p><strong>To:</strong> {order.to}</p>
              <p><strong>Price Offered:</strong> RM {order.price}</p>
            </div>
          </div>
        ))
      )}

      {/* Simple Modal */}
      {selectedOrderIndex !== null && (
        <>
          <div style={styles.backdrop} onClick={() => setSelectedOrderIndex(null)} />
          <div style={styles.modal}>
            <h3>Set Your ETA</h3>
            <div style={{ textAlign: "left", marginLeft: "6rem" }}>
              <p>
                <strong>From:</strong> {orders[selectedOrderIndex].from} <br />
                <strong>To:</strong> {orders[selectedOrderIndex].to} <br />
                <strong>Price:</strong> RM {orders[selectedOrderIndex].price} <br />
                <strong>No of Passenger:</strong> {orders[selectedOrderIndex].passanger}
              </p>
            </div>

            <label>
              ETA (in minutes):{" "}
              <select
                value={selectedETA}
                onChange={(e) => setSelectedETA(Number(e.target.value))}
              >
                {Array.from({ length: 60 }, (_, i) => i + 1).map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
            </label>

            <div style={{ marginTop: "1rem" }}>
              <button onClick={handleConfirmETA} style={{ marginRight: "1rem" }}>
                Confirm
              </button>
              <button onClick={() => setSelectedOrderIndex(null)}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    color: "#000",
    padding: "2rem",
    borderRadius: "10px",
    zIndex: 1000,
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
};

export default Driver;
