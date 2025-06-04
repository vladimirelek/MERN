import { Link, Outlet } from "react-router";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/add-products">Add Products</Link>
          </li>
          <li>
            <Link to="/dashboard/products">Products</Link>
          </li>
          <li>
            <Link to="/dashboard/comments">Comments</Link>
          </li>
          <li>
            <Link to="/shop">Back to shop</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
