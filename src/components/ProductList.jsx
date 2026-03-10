import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredItems = items
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => (filter ? p.category === filter : true))
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="container mt-4">
      <div className="row g-3 mb-4 bg-light p-3 rounded shadow-sm">
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Search by name..." onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select className="form-select" onChange={e => setSort(e.target.value)}>
            <option value="">Sort By Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select" onChange={e => setFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredItems.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={item.image} className="card-img-top" alt={item.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-primary fw-bold">Rs{item.price}</p>
                <p className="badge bg-secondary">{item.category}</p>
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(deleteProduct(item.id))}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;