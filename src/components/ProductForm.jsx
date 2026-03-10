import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';

const ProductForm = () => {
  const [form, setForm] = useState({ title: '', price: '', category: '', image: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.image) {
      return alert("Please fill all fields!");
    }
    dispatch(addProduct({ ...form, price: Number(form.price), id: Date.now().toString() }));
    setForm({ title: '', price: '', category: '', image: '' });
    alert("Product added successfully!");
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
        <h3 className="mb-3 text-center">Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" placeholder="Product Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <input className="form-control mb-2" type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          <input className="form-control mb-2" placeholder="Category (e.g. Electronics)" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
          <input className="form-control mb-2" placeholder="Image URL (link)" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
          <button className="btn btn-primary w-100 mt-2">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;