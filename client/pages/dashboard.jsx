
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SpendingTrendChart from "../components/SpendingTrendChart";
import CategoryPieChart from "../components/CategoryPieChart"; // ✅ Pie Chart component import
import TopPaymentMethods from "@/components/TopPaymentMethods";
import TopCategory from "@/components/TopCategory";
import BudgetSection from "@/components/BudgetSection";

export default function Dashboard() {
    const router = useRouter();
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        console.log("Dashboard token:", storedToken);

        if (!storedToken) {
            router.push("/signup"); // Not logged in, redirect to signup
        } else {
            setToken(storedToken);
        }
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Welcome to Dashboard</h1>
            <p>Protected page – Only accessible after signup/login</p>
            {token && (
                <>
                    {/* 🪪 Show Token */}
                    <p><b>JWT Token:</b> {token}</p>

                    {/* ✅ Pie Chart Display */}
                    <div style={{ maxWidth: "500px", marginTop: "2rem" }}>
                        <CategoryPieChart />
                    </div>

                    {/* token and existing content  dalne he  */}

                    {/* 📈 Line Chart Display */}
                    <SpendingTrendChart />

                     < div style={{marginTop:"2rem"}}>
                    <TopCategory />
                    </div>
        
                    <div style={{ marginTop: "2rem" }}>
                        <TopPaymentMethods />
                    </div>

                     <div style={{ marginTop: "3rem" }}>
            <BudgetSection />
          </div>

                </>

            )}
        </div>
    );
}
