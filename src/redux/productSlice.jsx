import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addProduct = createAsyncThunk('products/add', async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const updateProduct = createAsyncThunk('products/update', async (product) => {
  const res = await axios.put(`${API_URL}/${product.id}`, product);
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addProduct.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        state.items[index] = action.payload;
      });
  }
});

export default productSlice.reducer;