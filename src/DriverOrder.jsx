import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DriverOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.order);
  const [remainingTime, setRemainingTime] = useState(order?.driverInfo?.eta * 60 || 0);

  // Redirect if no order
  useEffect(() => {
    if (!order) {
      const timer = setTimeout(() => navigate("/driver"), 2000);
      return () => clearTimeout(timer);
    }
  }, [order, navigate]);

  // Countdown timer
  useEffect(() => {
    if (order?.driverInfo.status === "Accepted" && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [order, remainingTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleComplete = () => {
    const completedOrder = {
      ...order,
      driverInfo: {
        ...order.driverInfo,
        status: "Completed",
      },
    };
    setOrder(completedOrder);

    setTimeout(() => {
      navigate("/driver");
    }, 1500);
  };

  if (!order) return <p style={{ color: "#ffffff", padding: "2rem" }}>No order data found. Redirecting to driver page...</p>;

  return (
    <div style={{
    //   backgroundColor: "#1c1c1e",
    //   minHeight: "100vh",
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   padding: "2rem",
    //   color: "#ffffff",
    //   fontFamily: "Segoe UI, sans-serif",
    }}>
      <div style={{
        backgroundColor: "#2c2c34",
        border: "1px solid #3a3a42",
        borderRadius: "12px",
        padding: "2rem",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
          Order {order.driverInfo.status === "Completed" ? "Completed ✅" : "Accepted ✅"}
        </h2>

        {order.driverInfo.status === "Accepted" && (
        <p style={{
        fontSize: "1.5rem",
        color: remainingTime > 0 ? "#facc15" : "#ef4444", // red if time's up
        marginBottom: "1.5rem"
        }}>
        🕒 {remainingTime > 0 ? `Time Remaining: ${formatTime(remainingTime)}` : "Time's Up!"}
        </p>
    )}

        <div style = {{textAlign : "left", marginTop: "1rem", marginLeft:"5rem"}}>
        <p><strong>From:</strong> {order.from}</p>
        <p><strong>To:</strong> {order.to}</p>
        </div>

        {/* Complete Button */}
        {order.driverInfo.status === "Accepted" && (
          <button
            onClick={handleComplete}
            style={{
              marginTop: "2rem",
              backgroundColor: "#101012",
              color: "#ffffff",
              padding: "0.7rem 1.2rem",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#5e5e6e"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#101012"}
          >
            Complete Order
          </button>
        )}

        {/* Redirect Message */}
        {order.driverInfo.status === "Completed" && (
          <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#b0b0c0" }}>
            Redirecting to home page...
          </p>
        )}
      </div>
    </div>
  );
};

export default DriverOrder;
