import { useEffect, useState } from "react";
import axios from "axios";

const BudgetSection = () => {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("July 2025");
  const [status, setStatus] = useState(null);

  const token = localStorage.getItem("token");

  const fetchBudgetStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/budget?month=${month}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus(res.data);
    } catch (err) {
      console.error("Error fetching budget status", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/budget",
        { amount, month },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBudgetStatus();
    } catch (err) {
      console.error("Error setting budget", err);
    }
  };

  useEffect(() => {
    fetchBudgetStatus();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>📌 Monthly Budget</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter budget"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Set Budget</button>
      </form>

      {status && (
        <div style={{ marginTop: "1rem" }}>
          <p>📅 Month: {month}</p>
          <p>💰 Budget: ₹{status.budget}</p>
          <p>💸 Total Spent: ₹{status.totalExpense}</p>
          {status.exceeded ? (
            <p style={{ color: "red" }}>🚨 Budget Exceeded!</p>
          ) : (
            <p style={{ color: "green" }}>✅ Within Budget</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetSection;