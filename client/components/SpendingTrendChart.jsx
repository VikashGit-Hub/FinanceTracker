import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SpendingTrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrend = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/expenses/trend", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    };

    fetchTrend();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Spending Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
