import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin_dashbord">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">Online shop</div>
      </Link>

      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" to="/admin_dashbord">
          <i className="fas fa-hand-point-right" />
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin_category">
          <i className="fas fa-hand-point-right" />
          <span>Category</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin_product">
          <i className="fas fa-hand-point-right" />
          <span>Products</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/adminuser">
          <i className="fas fa-hand-point-right" />
          <span>Users</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin_oder">
          <i className="fas fa-hand-point-right" />
          <span>Orders</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/admin_changepassword">
          <i className="fas fa-hand-point-right" />
          <span>Change Password</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fas fa-hand-point-right" />
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  );
}
