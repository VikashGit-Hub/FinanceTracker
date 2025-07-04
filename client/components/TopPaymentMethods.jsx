import { useEffect, useState } from "react";
import axios from "axios";

const TopPaymentMethods = () => {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/expenses/top-payment-methods", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMethods(res.data))
        .catch((err) => console.error("Error:", err));
    }
  }, []);

  return (
    <div>
      <h3>Top 3 Payment Methods</h3>
      <ul>
        {methods.map((item, idx) => (
          <li key={idx}>
            {item.method}: ₹{item.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPaymentMethods;
