import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'; 
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const [auth, setAuth] = useState(false); 

  return (
    <Provider store={store}>
      <Router>
        <Navbar auth={auth} setAuth={setAuth} />
        
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <div className="text-center mt-5 p-5 bg-light rounded shadow-sm">
                <h1> Product Manager Admin</h1>
                <p className="lead mt-3">Manage your inventory, prices, and categories in one place.</p>
                {!auth ? (
                  <button className="btn btn-primary btn-lg mt-3" onClick={() => setAuth(true)}>
                    Login to Continue
                  </button>
                ) : (
                  <div className="alert alert-success mt-3">
                    You are logged in! Navigate using the menu above.
                  </div>
                )}
              </div>
            } />
            <Route 
              path="/products" 
              element={
                <PrivateRoute isAuthenticated={auth}>
                  <ProductList />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/add-product" 
              element={
                <PrivateRoute isAuthenticated={auth}>
                  <ProductForm />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;