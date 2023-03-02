import { createSlice } from '@reduxjs/toolkit';
import { productState } from 'type/interface';

const initialState: productState[] = [];

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProduct(state, action) {
      return action.payload;
    },
  },
});

export default products;
export const { loadProduct } = products.actions;
