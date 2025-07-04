import { useEffect, useState } from "react";
import axios from "axios";

const TopCategory = () => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/expenses/top-category", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCategory(res.data))
        .catch((err) => console.error("Error:", err));
    }
  }, []);

  return (
    <div>
      <h3>Top Spending Category</h3>
      {category ? (
        <p>
          {category.category} – ₹{category.total}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TopCategory;
