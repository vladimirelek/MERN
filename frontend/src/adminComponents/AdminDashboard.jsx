import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUsers, FaShoppingCart, FaComments } from "react-icons/fa";
import "./AdminDashboard.scss";
import { getDashboardStats } from "../services/adminService";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalComments: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.userStore.user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response.status === "successful") {
          setStats(response);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to fetch dashboard statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "#4CAF50",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FaShoppingCart />,
      color: "#2196F3",
    },
    {
      title: "Comments",
      value: stats.totalComments,
      icon: <FaComments />,
      color: "#FF9800",
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.username}!</h1>
        <p>Here&apos;s what&apos;s happening with your store today.</p>
      </div>

      <div className="stats-grid">
        {isLoading ? (
          <div className="loading-message">Loading statistics...</div>
        ) : (
          statCards.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div
                className="stat-icon"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
