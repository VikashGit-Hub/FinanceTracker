# FinanceTracker
A full-stack MERN application to manage personal budgets, track expenses, visualize spending trends, and receive alerts using dashboards and charts.
Tech Stacks :Frontend: Next.js (React Framework), MUI, Recharts
- Backend: Node.js, Express.js
- Database:MongoDB Atlas
- Authentication: JWT Token + Middleware
- Charts: Recharts (Pie, Line)
- FinanceTracker/
client/ → Frontend (Next.js + MUI)
server/ → Backend (Node.js + Express + MongoDB)

Frontend Setup (client/)
cd ../client
http://localhost:3000

Backend Setup (server/)
cd server
Backend will run on http://localhost:5000



User Authentication:
This project uses JWT (JSON Web Token) based authentication.
Users can Sign Up to create an account.
Then they can Log In using their credentials.
On login, a JWT token is issued and stored in localStorage.
All protected routes (like /dashboard, /api/expenses) are secured using an auth middleware 

Add / Edit / Delete Expense
Users can:
Add new expenses (amount, category, date, payment method, optional notes).
Edit their previously added expenses.
Delete any expense they no longer need.
Each expense is stored in MongoDB Atlas and linked with the logged-in user’s ID.

Dashboard
After login, users are redirected to a personal dashboard that:
Welcomes them.
Displays important stats like spending trends and budget alerts.
Shows different charts (Pie + Line) and financial summaries.

Pie Chart - Category-wise Expense
Displays a Recharts pie chart that breaks down expenses by category:
Food: ₹1200
Travel: ₹3000
Shopping: ₹500

Line Chart - Spending Trend
A Recharts line chart shows:
Monthly trend of expenses (e.g., Jan: ₹3000, Feb: ₹4500, etc.)
Data comes from backend API /api/expenses/trend

Budget & Alerts
A separate section in the dashboard that:
Lets users define a monthly budget (e.g., ₹10,000)
Alerts if spending crosses the defined budget

GitHub Deployment
This project has been successfully uploaded and version-controlled using Git and GitHub.
You can view or clone the repository from the link below:
https://github.com/VikashGit-Hub/FinanceTracker.git

