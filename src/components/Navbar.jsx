import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ auth, setAuth }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" style={{ fontWeight: 'bold' }} to="/">Product Manager</Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/products">Products</Link>
          <Link className="nav-link" to="/add-product">Add New</Link>
          {auth && (
            <button className="btn btn-danger btn-sm ms-3" onClick={() => setAuth(false)}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;